import React from "react";
import styles from "./button.module.scss";
import PropTypes from "prop-types";

const Button = ({
  children,
  buttonType,
  className,
  handleClick,
  ...otherProps
}) => {
  return (
    <button
      className={`${styles.buttonContainer} ${styles[buttonType]} ${className}`}
      {...otherProps}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  buttonType: PropTypes.string,
  className: PropTypes.string,
  handleClick: PropTypes.func,
};

Button.defaultProps = {
  children: "",
  buttonType: "",
  className: "",
  handleClick: () => {},
};

export default Button;
