import React from "react";
import styles from "./input.module.scss";
import PropTypes from "prop-types";

const Input = (props) => {
  const {
    type,
    placeholder,
    label,
    value,
    handleChange,
    error,
    isRequired,
    id,
    isReadOnly,
    ...otherProps
  } = props;

  const changeHandler = (e) => {
    if (type == "file") {
      handleChange(e);
    } else {
      handleChange(e.target.value);
    }
  };

  return (
    <div className={styles.input}>
      {label && <>
        <label htmlFor={id}>
        {label}{" "}
        {isRequired && <span className={styles.input__mandatory}>*</span>}
      </label>
      <br />
      </>}
   
      {type == "textarea" ? (
        <textarea
          readOnly={isReadOnly}
          type={type}
          id={id}
          className={`${styles.input__textBox} ${styles.input__textarea} ${
            error && styles.input__textBox__errorBorder
          } ${isReadOnly && styles.input__textBox__readOnly}`}
          placeholder={placeholder}
          onChange={changeHandler}
          {...otherProps}
          data-testid="input-field"
        />
      ) : (
        <input
          readOnly={isReadOnly}
          type={type}
          id={id}
          className={`${styles.input__textBox} ${
            error && type != "file" && styles.input__textBox__errorBorder
          } ${isReadOnly && styles.input__textBox__readOnly}`}
          placeholder={placeholder}
          value={type == "file" ? undefined : value}
          onChange={changeHandler}
          {...otherProps}
          data-testid="input-field"
        />
      )}

      <br />
      {error && <span className={styles.input__error}>{error}</span>}
    </div>
  );
};
Input.propTypes = {
  value: PropTypes.node,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  isRequired: PropTypes.bool,
  id: PropTypes.string,
  isReadOnly: PropTypes.bool,
};
Input.defaultProps = {
  value: "",
  label: "",
  name: "",
  placeholder: "",
  type: "",
  handleChange: () => {},
  error: "",
  isRequired: false,
  id: "",
  isReadOnly: false,
};

export default Input;
