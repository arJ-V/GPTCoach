// src/components/FeedbackModal.js
import React, { useEffect } from 'react';
import { usePromptContext } from '../contexts/PromptContext';
import './FeedbackModal.css';

const FeedbackModal = () => {
    const { evaluation, showFeedback, setShowFeedback } = usePromptContext();
    
    useEffect(() => {
        if (showFeedback) {
            // Auto-hide feedback after 10 seconds
            const timer = setTimeout(() => {
                setShowFeedback(false);
            }, 10000);
            
            return () => clearTimeout(timer);
        }
    }, [showFeedback, setShowFeedback]);
    
    if (!showFeedback || !evaluation) return null;
    
    const { rating, explanation } = evaluation;
    
    // Determine feedback content based on rating
    let title, message, className;
    
    switch (rating) {
        case 0:
            title = "Learning Opportunity";
            message = "Consider investing time in learning the basics first. Try asking about fundamental concepts or request explanations rather than direct solutions.";
            className = "feedback-low";
            break;
        case 1:
            title = "Good Start";
            message = "Your prompt shows potential! To improve learning outcomes, try being more specific about what you want to understand, not just what you want to accomplish.";
            className = "feedback-mid";
            break;
        case 2:
            title = "Excellent Prompt!";
            message = "Great job crafting a learning-focused prompt. You're on the right track to getting meaningful insights and developing deeper understanding.";
            className = "feedback-high";
            break;
        default:
            title = "Prompt Feedback";
            message = "We've analyzed your prompt. Consider how you might focus more on learning concepts than just getting answers.";
            className = "feedback-mid";
    }
    
    return (
        <div className="feedback-overlay">
            <div className={`feedback-modal ${className}`}>
                <button className="close-btn" onClick={() => setShowFeedback(false)}>×</button>
                <h2>{title}</h2>
                <p className="feedback-message">{message}</p>
                {explanation && (
                    <div className="explanation">
                        <h3>Analysis</h3>
                        <p>{explanation}</p>
                    </div>
                )}
                <div className="rating-display">
                    <div className="rating-stars">
                        {[...Array(3)].map((_, i) => (
                            <span key={i} className={i <= rating ? 'star filled' : 'star'}>★</span>
                        ))}
                    </div>
                    <p className="rating-label">
                        {rating === 0 ? 'Answer-seeking' : rating === 1 ? 'Developing' : 'Learning-focused'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;
