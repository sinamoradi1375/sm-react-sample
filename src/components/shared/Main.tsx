import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ITodo } from "../../models";
import TodoForm from "../todo/TodoForm";
import TodoTable from "../todo/TodoTable";

const Main = () => {
  const [todoArr, setTodoArr] = useState<ITodo[]>([]);
  return (
    <main>
      <Container className="pt-5">
        <Row>
          <Col>
            <TodoForm setTodoArr={setTodoArr} todoArr={todoArr} />
            <TodoTable todoArr={todoArr} />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Main;
