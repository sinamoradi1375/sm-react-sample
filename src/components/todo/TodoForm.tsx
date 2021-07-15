import { ITodo } from "../../models";
import { Formik } from "formik";
import { Col, Form as BootstrapForm, InputGroup, Row } from "react-bootstrap";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { useState } from "react";

interface IProps {
  setTodoArr: (todoArr: ITodo[]) => void;
  todoArr: ITodo[];
}

const TodoForm: React.FC<IProps> = ({ setTodoArr, todoArr }) => {
  // const [id, setId] = useState<number>(0);
  const formInitialValues: ITodo = { id, title: "", completed: false };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={Yup.object({
        title: Yup.string()
          .max(15, "Must be 15 characters or less!")
          .required("Please enter the title!"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // values = { ...values, id: id + 1 };
        setTimeout(() => {
          // alert(JSON.stringify(values, null, 2));
          setTodoArr([...todoArr, values]);
          resetForm();
          setSubmitting(false);
        }, 800);
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
        values,
        errors,
      }) => (
        <BootstrapForm className="mb-3" onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} md={4}>
              <InputGroup hasValidation>
                <InputGroup.Text>Title</InputGroup.Text>
                <BootstrapForm.Control
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.title}
                </BootstrapForm.Control.Feedback>
              </InputGroup>
            </Col>
            <Col xs={12} md={2} className="d-flex">
              <BootstrapForm.Group
                className="my-auto"
                controlId="formIsCompleted"
              >
                <BootstrapForm.Check
                  type="checkbox"
                  label="Is it Completed?"
                  name="completed"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.completed}
                />
              </BootstrapForm.Group>
            </Col>
            <Col xs={12} md={2}>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Add
              </Button>
            </Col>
          </Row>
        </BootstrapForm>
      )}
    </Formik>
  );
};

export default TodoForm;
