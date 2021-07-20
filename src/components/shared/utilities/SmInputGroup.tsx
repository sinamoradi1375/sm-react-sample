import { Field, FieldHookConfig, useField } from "formik";
import React from "react";
import { InputGroup, Form } from "react-bootstrap";

type PropsType = { label: string } & FieldHookConfig<{}>;

export const SmInputGroup: React.FC<PropsType> = ({ label, ...rest }) => {
  const [field, meta] = useField<{}>(rest);
  const hasError = meta.error && meta.touched;
  return (
    <InputGroup hasValidation className="mb-3 mb-md-0">
      <InputGroup.Text>{label}</InputGroup.Text>
      <Field type="text" as={Form.Control} {...field} isInvalid={hasError} />
      {hasError && (
        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      )}
    </InputGroup>
  );
};
