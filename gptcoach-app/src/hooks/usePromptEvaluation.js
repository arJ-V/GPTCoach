// src/hooks/usePromptEvaluation.js
import { useState, useEffect } from 'react';
import { evaluatePrompt } from '../services/geminiService';
import { usePromptContext } from '../contexts/PromptContext';

export const usePromptEvaluation = () => {
    const { currentPrompt, setEvaluation, setShowFeedback } = usePromptContext();
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const performEvaluation = async () => {
            if (!currentPrompt) return;
            
            setIsEvaluating(true);
            setError(null);
            
            try {
                const result = await evaluatePrompt(currentPrompt);
                setEvaluation(result);
                setShowFeedback(true);
            } catch (err) {
                setError(err.message);
                console.error("Error during prompt evaluation:", err);
            } finally {
                setIsEvaluating(false);
            }
        };
        
        if (currentPrompt) {
            performEvaluation();
        }
    }, [currentPrompt, setEvaluation, setShowFeedback]);
    
    return { isEvaluating, error };
};
