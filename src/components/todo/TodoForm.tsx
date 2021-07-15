// import { Formik, Field, Form, ErrorMessage } from "formik";
// import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
// import * as Yup from "yup";
import { ITodo } from "../../models";

const TodoForm = () => {
  // const formInitialValues: ITodo = { id: 0, title: "", completed: false };

  return (
    <></>
    // <Formik
    //   initialValues={formInitialValues}
    //   validationSchema={Yup.object({
    //     title: Yup.string()
    //       .max(15, "Must be 15 characters or less")
    //       .required("Required"),
    //   })}
    //   onSubmit={(values, { setSubmitting }) => {
    //     setTimeout(() => {
    //       alert(JSON.stringify(values, null, 2));
    //       setSubmitting(false);
    //     }, 400);
    //   }}
    // >
    //   <Form className="mb-3">
    //     <Form.Group className="mb-3">
    //       <Form.Label>Email address</Form.Label>
    //       <Form.Control type="text" placeholder="Enter your title" />
    //     </Form.Group>
    //     <Form.Group className="mb-3">
    //       <Form.Check type="checkbox" label="Is it Completed?" />
    //     </Form.Group>
    //     <Button variant="primary" type="submit">
    //       Add
    //     </Button>
    //   </Form>

    // </Formik>
  );
};

export default TodoForm;
