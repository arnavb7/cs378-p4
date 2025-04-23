import React, { useEffect, useState } from 'react';

const ErrorMessage = ({ message, onClear }) => {
  const [visible, setVisible] = useState(!!message);
  
  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClear) onClear();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [message, onClear]);
  
  if (!message || !visible) return null;
  
  return (
    <div className="error-message">
      <p>{message}</p>
      <button onClick={() => {
        setVisible(false);
        if (onClear) onClear();
      }}>×</button>
    </div>
  );
};

export default ErrorMessage;
