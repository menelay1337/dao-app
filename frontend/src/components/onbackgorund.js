import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Toasts } from './cards';

const HalfWindow = (props) => {
    const halfWindow={
        height: "90vh" /* Take up the full height of the viewport */
    }
    const leftcontent={
        padding: "20px",/* Add padding for better visibility */
        backgroundColor: "rgba(0, 0, 0, 0.5)", /* Set a semi-transparent black background */
    }
  return (
    <Container fluid style={halfWindow}>
      <Row>
        {/* Left content takes up 6 columns on larger screens and full width on smaller screens */}
        <Col lg={4} style={leftcontent}>
          {props.first}
        </Col>
        <Col>
        <Row></Row>
        </Col>
        {/* Right content takes up 6 columns on larger screens and is hidden on smaller screens */}
        <Col lg={6} style={leftcontent}>
                <Row>Name</Row> 
                <Container>
                <Col>
                A
                </Col>
                <Col>
                <Row>{props.second}</Row></Col>
                </Container>   
              
        </Col>
      </Row>
    </Container>
  );
};

export default HalfWindow;
