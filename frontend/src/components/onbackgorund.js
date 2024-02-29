import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Toasts } from './cards';
import { VoteDiagram } from './VoteDiagram';

const HalfWindow = (props) => {
  const [showDiagram, setShowDiagram] = useState(false);

  const toggleDiagram = () => {
    setShowDiagram(!showDiagram);
  };

  const halfWindow = {
    height: "90vh" /* Take up the full height of the viewport */
  };

  const leftcontent = {
    padding: "20px",/* Add padding for better visibility */
    backgroundColor: "rgba(0, 0, 0, 0.5)", /* Set a semi-transparent black background */
  };

  return (
    <Container fluid style={halfWindow}>
      <Row>
        {/* Left content takes up 4 columns on larger screens */}
        <Col lg={4} style={leftcontent}>
          {props.first}
        </Col>
        <Col>
        {props.info}
</Col>
        {/* Right content takes up 6 columns on larger screens */}
        <Col lg={6} style={leftcontent}>
          <Row><h1 className="text-center">Decentralized autonomous organization dApp</h1></Row>
          <Container>
            <Col>
              {/* Button to toggle diagram */}
              <Row>
                {/* <Button onClick={toggleDiagram}>
                  {showDiagram ? "Close Diagram" : "Show Diagram"}
                </Button> */}
              </Row>
              {/* Conditionally render diagram based on showDiagram state */}

              <Row>{props.second}</Row>

              <Row>{showDiagram && <Row><VoteDiagram data={props.data} /></Row>}</Row>
            </Col>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default HalfWindow;
