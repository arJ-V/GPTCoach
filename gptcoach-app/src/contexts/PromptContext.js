// src/contexts/PromptContext.js
import React, { createContext, useContext, useState } from 'react';

const PromptContext = createContext();

export const usePromptContext = () => useContext(PromptContext);

export const PromptProvider = ({ children }) => {
    const [currentPrompt, setCurrentPrompt] = useState('');
    const [evaluation, setEvaluation] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    
    const value = {
        currentPrompt,
        setCurrentPrompt,
        evaluation,
        setEvaluation,
        showFeedback,
        setShowFeedback
    };
    
    return (
        <PromptContext.Provider value={value}>
            {children}
        </PromptContext.Provider>
    );
};
