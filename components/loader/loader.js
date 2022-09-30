import React from 'react';
import PropTypes from 'prop-types';
import styles from './loader.module.scss';

const Loader = (props) => {
  const { isSmallLoader ,className} = props;

  return (
      <div data-testid='loader'
        className={`${styles.loaderWrapper__loader} ${isSmallLoader && styles.loaderWrapper__smallLoader} ${className} `}
      />
  
  );
};

Loader.propTypes = {
  isSmallLoader: PropTypes.bool,
  className:PropTypes.string
};

Loader.defaultProps = {
  isSmallLoader: false,
  className:''
};

export default Loader;