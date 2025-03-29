// src/components/PromptEvaluator.js
import { usePromptEvaluation } from '../hooks/usePromptEvaluation';

const PromptEvaluator = () => {
    const { isEvaluating, error } = usePromptEvaluation();
    
    // This component doesn't render UI, it just hooks into the evaluation logic
    return null;
};

export default PromptEvaluator;
