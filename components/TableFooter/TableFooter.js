import React, { useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./TableFooter.module.scss";

const TableFooter = ({ range, setPage, page, slice, dataTestId }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className={styles.tableFooter} data-testid={dataTestId}>
      {range.map((el, index) => (
        <button
          key={index}
          data-cy={el}
          className={`${styles.button} ${
            page === el ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

TableFooter.propTypes = {
  range: PropTypes.array,
  setPage: PropTypes.func,
  page: PropTypes.number,
  slice: PropTypes.array,
  dataTestId: PropTypes.string,
};

TableFooter.defaultProps = {
  range: [],
  setPage: () => {},
  page: 1,
  slice: [],
  dataTestId: "",
};

export default TableFooter;
