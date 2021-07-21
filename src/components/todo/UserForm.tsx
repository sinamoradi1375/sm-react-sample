import { IUser } from "../../models";
import { Formik, Form } from "formik";
import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { useState } from "react";
import {
  addUser,
  editUser,
  fetchUsersByThunk,
} from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { SmInputGroup } from "../shared/utilities/SmInputGroup";

interface IProps {
  userToEdit: IUser | null;
  setUserToEdit: (user: IUser | null) => void;
}

const UserForm: React.FC<IProps> = ({ userToEdit, setUserToEdit }) => {
  const isEditMode = userToEdit === null ? false : true;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less!")
      .required("Please enter your first name!"),
    lastName: Yup.string()
      .max(15, "Must be 15 characters or less!")
      .required("Please enter your last name!"),
    age: Yup.number()
      .max(99, "Must be less than 99 years!")
      .required("Please enter your age!"),
  });
  const [id, setId] = useState<number>(1);
  let formInitialValues: IUser = {
    id,
    firstName: "",
    lastName: "",
    age: "",
  };
  const dispatch = useDispatch();
  const fetchUsers = () => {
    try {
      setIsLoading(true);
      dispatch(fetchUsersByThunk());
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={!isEditMode ? formInitialValues : userToEdit!}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          if (!isEditMode) {
            const newId = id + 1;
            setId(newId);
            values = { ...values, id };
            dispatch(addUser(values));
          } else {
            dispatch(editUser(values));
            setUserToEdit(null);
          }
          resetForm();
          setSubmitting(false);
        }, 1000);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="mb-3">
          {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          <Row>
            <Col xs={12} md={4}>
              <SmInputGroup name="firstName" label="First Name" type="text" />
            </Col>
            <Col xs={12} md={4}>
              <SmInputGroup name="lastName" label="Last Name" type="text" />
            </Col>
            <Col xs={12} md={4}>
              <SmInputGroup name="age" label="Age" type="text" />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <div className="d-flex flex-column flex-md-row justify-content-start">
                {!isEditMode ? (
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    className=" mb-3 mb-md-0 me-md-2"
                  >
                    Add
                  </Button>
                ) : (
                  <div className="d-flex justify-content-space-around">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                      className=" mb-3 mb-md-0 me-2 w-100"
                    >
                      Save
                    </Button>

                    <Button
                      variant="danger"
                      title="Cancel"
                      className=" mb-3 mb-md-0 me-md-2 w-100"
                      onClick={() => {
                        setUserToEdit(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
                <Button
                  variant="secondary"
                  type="button"
                  onClick={fetchUsers}
                  disabled={isLoading}
                >
                  Fetch Some Users
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
