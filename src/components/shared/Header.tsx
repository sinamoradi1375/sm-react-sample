import { Col, Container, Row } from "react-bootstrap";

export const Header = () => {
  return (
    <header>
      <Container className="py-3">
        <Row>
          <Col>
            <div className="text-center">
              Welcome to my Todo App Implemented with React, Redux-toolkit,
              Typescript, Scss and Bootstrap 5
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};
