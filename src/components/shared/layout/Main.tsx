import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IUser } from "../../../models";
import UserForm from "../../todo/UserForm";
import UserTable from "../../todo/UserTable";

const Main = () => {
  const [userToEdit, setUserToEdit] = useState<IUser | null>(null);
  return (
    <main>
      <Container className="pt-5">
        <Row>
          <Col>
            <UserForm userToEdit={userToEdit} setUserToEdit={setUserToEdit} />
            <UserTable setUserToEdit={setUserToEdit} />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Main;
