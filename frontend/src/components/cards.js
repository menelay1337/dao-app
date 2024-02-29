import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export function Toasts({ onCardClick }) {
  const [toastsData, setToastsData] = useState([
    { id: 1, name: 'Toast 1', info: 'Information for Toast 1' },
    { id: 2, name: 'Toast 2', info: 'Information for Toast 2' },
    { id: 3, name: 'Toast 3', info: 'Information for Toast 3' },
    { id: 4, name: 'Toast 4', info: 'Information for Toast 4' },
    // ... Add more initial toast data as needed
  ]);

  const addToast = () => {
    // Add a new toast to the state
    setToastsData(prevToasts => [
      ...prevToasts,
      { id: prevToasts.length + 1, name: `New Toast ${prevToasts.length + 1}`, info: 'New information for the toast' },
    ]);
  };

  const handleCardClick = (toast) => {
    // Pass the clicked toast information to the parent component
    if (onCardClick) {
      onCardClick(toast);
    }
  };

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="Dark"
      style={{ minHeight: '200px' }}
    >
      <ToastContainer className="position-static">
        {toastsData.map((toast) => (
          <Toast key={toast.id} style={{ backgroundColor: 'black', color: 'white' }}>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
              <strong className="me-auto">{toast.name}</strong>
              {/* Button for each card */}
            
            </Toast.Header>
            <Toast.Body>{toast.info}</Toast.Body>
            <button
                className="btn btn-primary"
                onClick={() => handleCardClick(toast)}
              >
                Click Me
              </button>
          </Toast>
        ))}
      </ToastContainer>
      {/* Button to add a new toast */}
    </div>
  );
}
