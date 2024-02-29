import React from 'react';
import {Container} from 'react-bootstrap';
import { VoteDiagram } from './VoteDiagram';
import HalfWindow from './onbackgorund';
import { Toasts } from './cards';

  

export const Background = (props) => {
   
  
    const containerStyle = {
        backgroundImage: "url(/astro.gif)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
          color: 'white', // Set the text color to contrast with the background
        // textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Optional text shadow for better visibility
        animation: 'backgroundAnimation 2s linear infinite'
      };
  return (
    <>
     
    
      <Container fluid style={containerStyle}>
        <h1>Deep Ocean</h1>
        {props.item}
      </Container>

    </>
  );
};


