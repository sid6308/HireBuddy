import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../../store/actions/user.action";
import Loader from "components/loader/loader";
import Input from "components/input/input";
import styles from "./index.module.scss";
import Button from "components/button/button";

const LoginPage = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const router = useRouter();
  const dispatch = useDispatch();
  const { loggingIn, loggedIn, error } = useSelector((state) => state.login);

  useEffect(() => {
    if (loggedIn) {
      router.push("/");
    }
  }, [loggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (error) {
      if (error == "Incorrect Password") {
        setFormErrors((formErrors) => ({ ...formErrors, password: error }));
      } else if (error == "User not found") {
        setFormErrors((formErrors) => ({ ...formErrors, email: error }));
      }
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors((prevState) => {
      prevState[name] = "";
      return { ...prevState };
    });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (
      !(
        regex.test(values.email) &&
        values.email.endsWith("@publicissapient.com")
      )
    ) {
      errors.email = "Please enter valid email";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 8 characters";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorValues = validate(formValues);
    setFormErrors(errorValues);
    if (Object.keys(errorValues).length === 0) {
      dispatch(userActions.login(formValues.email, formValues.password));
    }
  };

  return (
    <div className={styles.loginform}>
      <form onSubmit={handleSubmit} data-testid="form">
        <div className={styles.loginform__heading}>
          <h1>
            Hire<span className={styles.loginform__heading__buddy}>Buddy</span>
          </h1>
        </div>
        <div className={styles.loginform__input}>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            label="Email"
            id="email"
            value={formValues.email}
            onChange={handleChange}
            error={formErrors.email}
            autoComplete="off"
            aria-label="Email"
          />
        </div>
        <div className={styles.loginform__input}>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            label="Password"
            id="password"
            value={formValues.password}
            onChange={handleChange}
            error={formErrors.password}
            aria-label="Password"
          />
        </div>
        <div className={styles.loginform__button}>
          <Button
            type="submit"
            buttonType="solidDefault"
            data-testid="loginBtn"
          >
            {loggingIn ? <Loader isSmallLoader /> : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
