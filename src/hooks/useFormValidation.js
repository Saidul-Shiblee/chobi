import { useState } from "react";
import { omit } from "lodash";

const useFormValidation = (callback1, callback2) => {
  const [values, setValues] = useState({});
  const [error, setError] = useState({});

  const validate = (name, value) => {
    switch (name) {
      case "userName":
        if (value.length <= 0) {
          setError((prvState) => ({
            ...prvState,
            userName: "User name can not be left blank",
          }));
          return;
        } else {
          if (!value.match(/^[0-9a-z]+$/i)) {
            setError((prvState) => ({
              ...prvState,
              userName: "User name should Not have any special Character",
            }));

            return;
          } else {
            let newObj = omit(error, "userName");
            setError(newObj);
            return;
          }
        }
      case "email":
        if (value.length <= 0) {
          setError((prvState) => ({
            ...prvState,
            email: "Email can not be left blank",
          }));
          return;
        } else {
          if (!value.match(/(\S+@\S+\.\S+)/)) {
            setError((prvState) => ({
              ...prvState,
              email: "Email format is not valid",
            }));

            return;
          } else {
            let newObj = omit(error, "email");
            setError(newObj);
            return;
          }
        }
      case "password":
        if (value.length <= 0) {
          setError((prvState) => ({
            ...prvState,
            password: "Password can not be left blank",
          }));
          return;
        } else {
          if (
            !value.match(
              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
            )
          ) {
            setError((prvState) => ({
              ...prvState,
              password:
                " Password must be of 6 Characters,including 1 No. & 1 Special Character",
            }));
            return;
          } else {
            let newObj = omit(error, "password");
            setError(newObj);
            return;
          }
        }

      case "confirmPassword":
        if (value.length <= 0) {
          setError((prvState) => ({
            ...prvState,
            confirmPassword: "Confirm Password can not be left blank",
          }));
          return;
        } else {
          if (values.password !== value) {
            setError((prvState) => ({
              ...prvState,
              confirmPassword: "Password does not match",
            }));
            return;
          } else {
            let newObj = omit(error, "confirmPassword");
            setError(newObj);
            return;
          }
        }

      default:
        break;
    }
  };

  const handleChange = (e) => {
    callback2(false);
    validate(e.target.name, e.target.value);
    setValues((pS) => ({ ...pS, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validate(name, value);
    if (Array.from(Object.values(error)).length > 0) {
      callback2(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Array.from(Object.values(error)).length === 0) {
      callback1();
    }
  };

  return [values, error, setError, handleChange, handleBlur, handleSubmit];
};

export default useFormValidation;
