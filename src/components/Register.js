import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";

const validateRegister = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Username is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

const Register = ({ onRegister }) => {
  const navigate = useNavigate();

  const handleRegisterSubmit = async (values, formikHelpers) => {
    const isRegistered = await onRegister(values);

    if (isRegistered) {
      formikHelpers.resetForm();
      navigate("/login");
    }
  };

  return (
    <div className="login-box">
      <h1>Register System</h1>

      <Formik
        initialValues={{ username: "", password: "" }}
        validate={validateRegister}
        onSubmit={handleRegisterSubmit}
      >
        <Form>
          <Field type="text" name="username" placeholder="Username" />
          <ErrorMessage
            className="form-error"
            component="p"
            name="username"
          />

          <Field type="password" name="password" placeholder="Password" />
          <ErrorMessage
            className="form-error"
            component="p"
            name="password"
          />

          <button type="submit">Register</button>
        </Form>
      </Formik>

      <p className="switch-text">Already have an account?</p>

      <Link className="secondary-button" to="/login">
        Go to Login
      </Link>
    </div>
  );
};

export default Register;
