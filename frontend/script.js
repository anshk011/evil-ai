// frontend/script.js
class VADERWebUI {
    constructor() {
        this.apiBaseUrl = 'http://localhost:8000'; // Backend URL
        this.chatHistory = [];
        this.messageCount = 0;
        this.tokenCount = 0;
        this.isConnected = false;
        
        this.init();
    }
    
    async init() {
        this.updateTime();
        this.setupEventListeners();
        await this.checkConnection();
        this.loadChatHistory();
        
        // Auto-update time every minute
        setInterval(() => this.updateTime(), 60000);
    }
    
    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
        document.getElementById('currentTime').textContent = timeString;
    }
    
    async checkConnection() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/status`);
            const data = await response.json();
            
            if (data.status === 'online') {
                this.updateConnectionStatus('connected');
                this.isConnected = true;
            } else {
                this.updateConnectionStatus('disconnected');
                this.isConnected = false;
            }
        } catch (error) {
            this.updateConnectionStatus('error');
            this.isConnected = false;
            console.error('Connection check failed:', error);
        }
    }
    
    updateConnectionStatus(status) {
        const indicator = document.querySelector('.status-dot');
        const statusText = document.querySelector('.status-text');
        const connectionStatus = document.getElementById('connectionStatus');
        
        switch(status) {
            case 'connected':
                indicator.style.background = '#00ff41';
                indicator.style.animation = 'pulse 2s infinite';
                statusText.textContent = 'Connected';
                connectionStatus.innerHTML = '<i class="fas fa-check-circle"></i> Connected to VADER API';
                break;
            case 'disconnected':
                indicator.style.background = '#ffaa00';
                indicator.style.animation = 'blink 1s infinite';
                statusText.textContent = 'Disconnected';
                connectionStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Disconnected - Check API Key';
                break;
            case 'error':
                indicator.style.background = '#ff5555';
                indicator.style.animation = 'blink 0.5s infinite';
                statusText.textContent = 'Error';
                connectionStatus.innerHTML = '<i class="fas fa-times-circle"></i> Connection Error';
                break;
        }
    }
    
    setupEventListeners() {
        // Send button
        document.getElementById('sendBtn').addEventListener('click', () => this.sendMessage());
        
        // Clear button
        document.getElementById('clearBtn').addEventListener('click', () => this.clearInput());
        
        // New chat button
        document.getElementById('newChatBtn').addEventListener('click', () => this.newChat());
        
        // Reset AI button
        document.getElementById('resetBtn').addEventListener('click', () => this.resetAI());
        
        // Enter key in textarea
        document.getElementById('messageInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Quick command buttons
        document.querySelectorAll('.cmd-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const command = e.target.dataset.cmd;
                document.getElementById('messageInput').value = command;
                this.sendMessage();
            });
        });
    }
    
    async sendMessage() {
        const input = document.getElementById('messageInput');
        const message = input.value.trim();
        
        if (!message || !this.isConnected) {
            if (!this.isConnected) {
                this.showError('Not connected to VADER API. Check backend server.');
            }
            return;
        }
        
        // Add user message to UI
        this.addMessageToUI('user', message);
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator(true);
        
        try {
            // Prepare request
            const streamEnabled = document.getElementById('streamToggle').checked;
            const requestBody = {
                message: message,
                stream: streamEnabled
            };
            
            // Send to backend
            const response = await fetch(`${this.apiBaseUrl}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Add AI response to UI
            this.addMessageToUI('ai', data.response);
            
            // Update stats
            this.messageCount += 2;
            this.tokenCount += data.tokens_used || 0;
            this.updateStats();
            
            // Save to history
            this.saveToHistory(message, data.response);
            
        } catch (error) {
            console.error('Error sending message:', error);
            this.addMessageToUI('ai', `[ERROR] ${error.message}`);
        } finally {
            this.showTypingIndicator(false);
        }
    }
    
    addMessageToUI(sender, content) {
        const chatMessages = document.getElementById('chatMessages');
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `
            <div class="message-header">
                <span class="sender">${sender === 'user' ? 'YOU' : 'VADER'}</span>
                <span class="timestamp">${timeString}</span>
            </div>
            <div class="message-content">${this.formatMessage(content)}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    formatMessage(content) {
        // Simple markdown-like formatting
        let formatted = content
            .replace(/\[VADER\]/g, '<strong class="vader-tag">[VADER]</strong>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\*([^*]+)\*/g, '<em>$1</em>')
            .replace(/```([^`]+)```/g, '<pre>$1</pre>');
        
        // Convert URLs to links
        formatted = formatted.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" style="color:#00ff9d;">$1</a>'
        );
        
        // Convert newlines to <br>
        formatted = formatted.replace(/\n/g, '<br>');
        
        return formatted;
    }
    
    showTypingIndicator(show) {
        const indicator = document.getElementById('typingIndicator');
        indicator.style.display = show ? 'flex' : 'none';
    }
    
    clearInput() {
        document.getElementById('messageInput').value = '';
        document.getElementById('messageInput').focus();
    }
    
    async newChat() {
        this.chatHistory = [];
        document.getElementById('chatMessages').innerHTML = `
            <div class="message ai-message">
                <div class="message-header">
                    <span class="sender">VADER</span>
                    <span class="timestamp" id="currentTime"></span>
                </div>
                <div class="message-content">
                    [VADER] New session initialized. What's your query?
                </div>
            </div>
        `;
        this.updateTime();
        this.messageCount = 0;
        this.tokenCount = 0;
        this.updateStats();
        
        // Reset backend chat history
        try {
            await fetch(`${this.apiBaseUrl}/reset`, { method: 'POST' });
        } catch (error) {
            console.error('Failed to reset backend:', error);
        }
    }
    
    async resetAI() {
        if (confirm('Reset AI? This will clear all conversation history.')) {
            await this.newChat();
        }
    }
    
    updateStats() {
        document.getElementById('messageCount').textContent = `${this.messageCount} messages`;
        document.getElementById('tokenCount').textContent = `${this.tokenCount} tokens`;
    }
    
    saveToHistory(userMessage, aiResponse) {
        const historyItem = {
            user: userMessage.substring(0, 50) + (userMessage.length > 50 ? '...' : ''),
            timestamp: new Date().toLocaleTimeString(),
            full: { user: userMessage, ai: aiResponse }
        };
        
        this.chatHistory.unshift(historyItem);
        this.updateHistoryUI();
        
        // Save to localStorage
        localStorage.setItem('vaderChatHistory', JSON.stringify(this.chatHistory.slice(0, 20)));
    }
    
    loadChatHistory() {
        const saved = localStorage.getItem('vaderChatHistory');
        if (saved) {
            this.chatHistory = JSON.parse(saved);
            this.updateHistoryUI();
        }
    }
    
    updateHistoryUI() {
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = '';
        
        this.chatHistory.slice(0, 5).forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <div style="font-size:0.8em;color:#888;">${item.timestamp}</div>
                <div>${item.user}</div>
            `;
            div.addEventListener('click', () => this.loadHistoryItem(index));
            historyList.appendChild(div);
        });
    }
    
    loadHistoryItem(index) {
        const item = this.chatHistory[index];
        this.newChat();
        this.addMessageToUI('user', item.full.user);
        this.addMessageToUI('ai', item.full.ai);
    }
    
    showError(message) {
        const chatMessages = document.getElementById('chatMessages');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'message ai-message';
        errorDiv.style.borderLeftColor = '#ff5555';
        errorDiv.innerHTML = `
            <div class="message-header">
                <span class="sender" style="color:#ff5555;">ERROR</span>
                <span class="timestamp">${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="message-content" style="color:#ff5555;">
                <i class="fas fa-exclamation-circle"></i> ${message}
            </div>
        `;
        chatMessages.appendChild(errorDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.vaderUI = new VADERWebUI();
});