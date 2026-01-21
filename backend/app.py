# backend/app.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import os
import sys
from datetime import datetime

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from vader_core import VADERBrain

app = FastAPI(title="VADER AI", description="Unfiltered AI Assistant")

# CORS middleware for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Message]] = None
    stream: Optional[bool] = False

class ChatResponse(BaseModel):
    response: str
    timestamp: str
    tokens_used: Optional[int] = None

class SystemStatus(BaseModel):
    status: str
    model: str
    api_connected: bool
    uptime: str

# Global AI instance
vader_ai = None

@app.on_event("startup")
async def startup_event():
    """Initialize VADER AI on startup"""
    global vader_ai
    try:
        # Get API key from environment
        api_key = os.getenv("OPENROUTER_API_KEY")
        if not api_key:
            # Try to load from .env file
            from dotenv import load_dotenv
            load_dotenv()
            api_key = os.getenv("OPENROUTER_API_KEY")
        
        if api_key:
            vader_ai = VADERBrain(api_key)
            print("✅ VADER AI initialized successfully")
        else:
            print("⚠️  No API key found. Set OPENROUTER_API_KEY environment variable.")
    except Exception as e:
        print(f"❌ Failed to initialize VADER AI: {e}")

@app.get("/")
async def root():
    return {
        "message": "VADER AI API",
        "status": "operational" if vader_ai else "awaiting_api_key",
        "endpoints": ["/chat", "/status", "/reset", "/models"]
    }

@app.get("/status")
async def get_status():
    """Get system status"""
    return SystemStatus(
        status="online" if vader_ai else "offline",
        model="deepseek/deepseek-r1-distill-llama-70b" if vader_ai else "none",
        api_connected=vader_ai is not None,
        uptime=datetime.now().isoformat()
    )

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Main chat endpoint"""
    if not vader_ai:
        raise HTTPException(status_code=503, detail="AI not initialized. Check API key.")
    
    try:
        # Process chat
        response_text = ""
        
        if request.stream:
            # For streaming, we'd use Server-Sent Events
            # Simplified for now
            for chunk in vader_ai.chat(request.message):
                response_text += chunk
        else:
            # Non-streaming
            response = vader_ai.chat(request.message)
            response_text = "".join(list(response))
        
        return ChatResponse(
            response=response_text,
            timestamp=datetime.now().isoformat(),
            tokens_used=len(response_text.split())  # Approximate
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Error: {str(e)}")

@app.post("/reset")
async def reset_chat():
    """Reset chat history"""
    if vader_ai:
        vader_ai.reset()
        return {"message": "Chat history reset", "success": True}
    return {"message": "AI not initialized", "success": False}

@app.get("/models")
async def get_models():
    """Get available models"""
    return {
        "current": "deepseek/deepseek-r1-distill-llama-70b",
        "available": [
            "deepseek/deepseek-r1-distill-llama-70b",
            "openai/gpt-3.5-turbo",
            "openai/gpt-4",
            "google/gemini-pro"
        ]
    }

if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )