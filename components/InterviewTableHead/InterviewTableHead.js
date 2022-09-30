import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./InterviewTableHead.module.scss";

const InterviewTableHead = ({
  columns,
  handleSorting,
  dataTestid,
  sortIcon,
}) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("");

  useEffect(() => {
    setSortField("");
    setOrder("");
  }, [sortIcon]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead className={styles.tableHead} data-testid={dataTestid}>
      <tr>
        {columns.map(({ header, accessor, sortable }) => {
          const cl = sortable
            ? sortField === accessor && order === "asc"
              ? styles["arrow__asc"]
              : sortField === accessor && order === "desc"
              ? styles["arrow__desc"]
              : styles["arrow__default"]
            : "";
          return (
            <th
              role="tableHeader"
              key={accessor}
              data-testid={accessor}
              onClick={sortable ? () => handleSortingChange(accessor) : null}
            >
              <div className={styles.columnHeader}>
                <span>{header}</span>
                {sortable && (
                  <span
                    className={`${styles.arrow} ${cl}`}
                    data-testid="sortIcon"
                  >
                    &nbsp;
                  </span>
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

InterviewTableHead.propTypes = {
  columns: PropTypes.array,
  handleSorting: PropTypes.func,
  dataTestid: PropTypes.string,
  sortIcon: PropTypes.bool,
};

InterviewTableHead.defaultProps = {
  columns: [],
  handleSorting: () => {},
  dataTestid: "",
  sortIcon: true,
};

export default InterviewTableHead;
