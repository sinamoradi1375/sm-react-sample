import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ITodo } from "../../models";
import TodoForm from "../todo/TodoForm";
import TodoTable from "../todo/TodoTable";

const Main = () => {
  // const [todoArr, setTodoArr] = useState<ITodo[]>([]);
  // const handleTodoDelete = (todoId: number) => {
  //   if (!!todoId) {
  //     if (window.confirm("Do you really want to delete this record?"))
  //       setTodoArr([...todoArr.filter((x) => x.id !== todoId)]);
  //   }
  // };

  return (
    <main>
      <Container className="pt-5">
        <Row>
          <Col>
            <TodoForm />
            {/* <TodoTable handleTodoDelete={handleTodoDelete} /> */}
            <TodoTable />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Main;
