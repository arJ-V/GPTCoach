// ==UserScript==
// @name         ChatGPT Prompt Coach Monitor
// @namespace    http://gptcoach.app/
// @version      0.1
// @description  Monitors ChatGPT prompts and sends them to GPTCoach for learning-focused feedback
// @author       GPTCoach
// @match        https://chat.openai.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // Configuration
    const APP_URL = 'http://localhost:3000'; // URL where the GPTCoach app is running
    
    // Function to monitor textarea inputs
    function monitorPromptInput() {
        // Find the main prompt textarea in ChatGPT
        const textareas = document.querySelectorAll('textarea');
        const promptTextarea = Array.from(textareas).find(el => 
            el.placeholder && el.placeholder.toLowerCase().includes('message chatgpt')
        );
        
        if (!promptTextarea) {
            // If not found, retry after a short delay
            setTimeout(monitorPromptInput, 1000);
            return;
        }
        
        // Function to handle form submission
        function handleSubmit() {
            const promptText = promptTextarea.value.trim();
            if (promptText) {
                // Send the prompt to our React app
                window.postMessage({
                    type: 'CHATGPT_PROMPT',
                    content: promptText
                }, '*');
                
                // Also send to the app via window.postMessage if it's in an iframe
                try {
                    const iframe = document.querySelector('iframe[src*="' + APP_URL + '"]');
                    if (iframe && iframe.contentWindow) {
                        iframe.contentWindow.postMessage({
                            type: 'CHATGPT_PROMPT',
                            content: promptText
                        }, '*');
                    }
                } catch (e) {
                    console.error('Error sending prompt to iframe:', e);
                }
            }
        }
        
        // Find the send button
        const sendButton = document.querySelector('button[data-testid="send-button"]') || 
                          document.querySelector('button[aria-label="Send message"]');
        
        if (sendButton) {
            // Create a wrapper for the original click event
            const originalClick = sendButton.onclick;
            sendButton.onclick = function(e) {
                handleSubmit();
                if (originalClick) {
                    return originalClick.call(this, e);
                }
            };
            
            // Also monitor for Enter key in the textarea
            promptTextarea.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    setTimeout(handleSubmit, 0);
                }
            });
            
            console.log('GPTCoach: ChatGPT prompt monitoring initialized');
        } else {
            // If not found, retry after a short delay
            setTimeout(monitorPromptInput, 1000);
        }
    }
    
    // Start monitoring when the page is fully loaded
    window.addEventListener('load', function() {
        // Wait a bit for ChatGPT's UI to fully initialize
        setTimeout(monitorPromptInput, 2000);
        
        // Create a small floating button to open the app
        const floatingButton = document.createElement('div');
        floatingButton.innerHTML = '🧠';
        floatingButton.title = 'Open GPTCoach';
        floatingButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background-color: #10a37f;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            z-index: 9999;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        
        floatingButton.addEventListener('click', function() {
            window.open(APP_URL, 'GPTCoach', 'width=400,height=600');
        });
        
        document.body.appendChild(floatingButton);
    });
})();
