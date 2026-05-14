import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, Navigate, useNavigate } from "react-router-dom";

const validateLogin = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Username is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

const Login = ({ isLoggedIn, onLogin }) => {
  const navigate = useNavigate();

  const handleLoginSubmit = async (values) => {
    const isLoggedInSuccessfully = await onLogin(values);

    if (isLoggedInSuccessfully) {
      navigate("/home");
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="login-box">
      <h1>Login System</h1>

      <Formik
        initialValues={{ username: "", password: "" }}
        validate={validateLogin}
        onSubmit={handleLoginSubmit}
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

          <button type="submit">Login</button>
        </Form>
      </Formik>

      <p className="switch-text">Dont have an account?</p>

      <Link className="secondary-button" to="/register">
        Go to Register
      </Link>
    </div>
  );
};

export default Login;
