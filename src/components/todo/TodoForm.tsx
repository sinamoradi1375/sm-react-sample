import { ITodo } from "../../models";
import { Formik } from "formik";
import {
  Col,
  Form as BootstrapForm,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { addTodo, getTodosAsync } from "../../store/slices/todoSlice";
import { useDispatch } from "react-redux";
import { RootState } from "../../store";

interface IProps {}

const TodoForm: React.FC<IProps> = () => {
  const [id, setId] = useState<number>(1);
  const formInitialValues: ITodo = { id, title: "", completed: false };
  const dispatch = useDispatch();
  const fetchTodos = async () => {
    try {
      dispatch(getTodosAsync());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={Yup.object({
        title: Yup.string()
          .max(15, "Must be 15 characters or less!")
          .required("Please enter the title!"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const newId = id + 1;
        setId(newId);
        values = { ...values, id };
        dispatch(addTodo(values));
        resetForm();
        setSubmitting(false);
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
              <InputGroup hasValidation className="mb-3 mb-md-0">
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
                className="my-auto mb-3 mb-md-0"
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
            <Col xs={12} md={1}>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                className=" mb-3 mb-md-0"
              >
                Add
              </Button>
            </Col>
            <Col>
              <Button variant="secondary" type="button" onClick={fetchTodos}>
                Fetch Some Todos From API
              </Button>
            </Col>
          </Row>
        </BootstrapForm>
      )}
    </Formik>
  );
};

export default TodoForm;
