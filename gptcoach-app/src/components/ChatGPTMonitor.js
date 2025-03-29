// src/components/ChatGPTMonitor.js
import { useEffect } from 'react';
import { usePromptContext } from '../contexts/PromptContext';

const ChatGPTMonitor = () => {
    const { setCurrentPrompt } = usePromptContext();
    
    useEffect(() => {
        const handlePromptMessage = (event) => {
            // This receives messages from ANY source, including our Tampermonkey script
            if (event.data && event.data.type === 'CHATGPT_PROMPT') {
                setCurrentPrompt(event.data.content);
            }
        };
        
        window.addEventListener('message', handlePromptMessage);
        return () => window.removeEventListener('message', handlePromptMessage);
    }, [setCurrentPrompt]);
    
    return null; // This component doesn't render anything
};

export default ChatGPTMonitor;
