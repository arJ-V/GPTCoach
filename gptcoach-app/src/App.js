// src/App.js (Updated)
import React from 'react';
import { PromptProvider, usePromptContext } from './contexts/PromptContext';
import ChatGPTMonitor from './components/ChatGPTMonitor';
import FeedbackModal from './components/FeedbackModal';
import PromptEvaluator from './components/PromptEvaluator';
import './App.css';

// Separate component for test area that will be inside the PromptProvider
const TestArea = () => {
  const [testPrompt, setTestPrompt] = React.useState('');
  const { setCurrentPrompt } = usePromptContext();
  
  const handleSubmitTestPrompt = () => {
      if (testPrompt.trim()) {
          window.postMessage({
              type: 'CHATGPT_PROMPT',
              content: testPrompt
          }, '*');
      }
  };

  return (
    <div className="test-area">
        <h2>Test Your Prompts</h2>
        <p>Simulate entering a ChatGPT prompt to see the feedback:</p>
        <textarea 
            placeholder="Enter a test prompt here..."
            value={testPrompt}
            onChange={(e) => setTestPrompt(e.target.value)}
        />
        <button onClick={handleSubmitTestPrompt}>Submit Test Prompt</button>
    </div>
  );
};

function App() {
    return (
        <PromptProvider>
            <div className="app">
                <header className="app-header">
                    <h1>ChatGPT Prompt Coach</h1>
                    <p>Your assistant for better, learning-focused prompts</p>
                </header>
                
                {/* Monitors ChatGPT for prompts */}
                <ChatGPTMonitor />
                
                {/* Handles prompt evaluation */}
                <PromptEvaluator />
                
                {/* Shows feedback when available */}
                <FeedbackModal />
                
                {/* For testing purposes */}
                <TestArea />
            </div>
        </PromptProvider>
    );
}

export default App;
