import React from "react";
import { Formik, Field } from "formik";
import { Form } from "./wrappers";
import Button from '../Button';

const DEFAULT_VALIDATE = () => ({});

const generalValidationError = ({ touched, errors, message }) => {
  return !!(errors && Object.keys(errors).length
    && touched && Object.keys(touched).length)
    && (
      <Form.ErrorMessage>
        {message || 'There are some errors'}
      </Form.ErrorMessage>
    );
};


const BasicForm = ({
  data,
  onSubmit,
  initialValues,
}) => (
  <div>
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validate={data.validate || DEFAULT_VALIDATE}
      onSubmit={onSubmit}
      render={({ errors, touched, error }) => (
        <Form>
          {data.message && (
            <Form.Message>{data.message}</Form.Message>
          )}
          {error && (
            <Form.ErrorMessage>{error}</Form.ErrorMessage>
          )}
          {generalValidationError({
            touched,
            errors,
            message: data.generalErrorMessage
          })}
          {data.fields.map(field => (
            <div>
              <Form.Label
                htmlFor={field.name}
              >
                {field.label}
              </Form.Label>
              <Field
                name={field.name}
                placeholder={field.placeholder}
                render={field.render}
              />
              {errors[field.name] &&
                touched[field.name] &&
                (
                  <Form.FieldError>
                    {errors[field.name]}
                  </Form.FieldError>
                )
              }
            </div>
          ))}
          {generalValidationError({
            touched,
            errors,
            message: data.generalErrorMessage
          })}
          <Button
            type="submit"
            modifiers="positive"
            {...(data.submitButtonProps || {})}
          >
            {data.submitText}
          </Button>
        </Form>
      )}
    />
  </div>
);

BasicForm.defaultProps = {
  initialValues: {},
  data: {
    message: null,
    fields: [],
    submitText: null,
  },
};

export default BasicForm;
