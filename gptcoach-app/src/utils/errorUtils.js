// src/utils/errorUtils.js
export const handleApiError = (error) => {
    console.error('API Error:', error);
    
    if (error.name === 'AbortError') {
        return 'Request timed out. Please try again.';
    }
    
    if (error.response) {
        if (error.response.status === 429) {
            return 'Too many requests. Please try again later.';
        }
        if (error.response.status === 403) {
            return 'API access denied. Please check your API key.';
        }
        return `Server error: ${error.response.status}`;
    } else if (error.request) {
        return 'No response from server. Please check your connection.';
    } else {
        return 'An unexpected error occurred.';
    }
};

// Retry mechanism for API calls
export const withRetry = async (fn, maxRetries = 3, delay = 1000) => {
    let lastError;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            
            if (attempt < maxRetries - 1) {
                // Exponential backoff
                await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
            }
        }
    }
    
    throw lastError;
};
