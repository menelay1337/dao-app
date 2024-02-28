import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import VoteButton from './buttons';
import { VoteDiagram } from './VoteDiagram';
import React, { useState } from 'react';
export function Toasts() {
  const [toastsData, setToastsData] = useState([
    { name: 'Toast 1', info: 'Information for Toast 1' },
    { name: 'Toast 2', info: 'Information for Toast 2' },
    { name: 'Toast 3', info: 'Information for Toast 3' },
    { name: 'Toast 3', info: 'Information for Toast 3' },

    // ... Add more initial toast data as needed
  ]);
  const addToast = () => {
    // Add a new toast to the state
    setToastsData(prevToasts => [
      ...prevToasts,
      { name: `New Toast ${prevToasts.length + 1}`, info: 'New information for the toast' },
    ]);
  };
  return (
    <div
    aria-live="polite"
    aria-atomic="true"
    className="Dark"
    style={{ minHeight: '200px' }}
  >
    <ToastContainer className="position-static">
      {toastsData.map((toast, index) => (
        <Toast key={index} style={{ backgroundColor: 'black', color: 'white' }}>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">{toast.name}</strong>
          </Toast.Header>
          
          <Toast.Body>{toast.info} 
          </Toast.Body>
          <VoteButton></VoteButton>

        </Toast>
      ))}
    </ToastContainer>
  </div>
  );
}

