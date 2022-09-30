import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import styles from "./TableBody.module.scss";

const TableBody = ({ tableData, columns, dataTestid }) => {
  return (
    <tbody className={styles.tableBody} data-testid={dataTestid}>
      {tableData.length ? (
        tableData.map((data) => {
          return (
            <tr key={data.id} data-cy="dataRow">
              {columns.map(({ accessor }) => {
                const tData = data[accessor] ? (
                  typeof data[accessor] == "object" ? (
                    data[accessor].label
                  ) : (
                    data[accessor]
                  )
                ) : accessor == "action" ? (
                  <Link  href={`/interviewDetail/${data.id}`}>
                    <i
                    data-cy='action'
                      className={`fa fa-circle fa-ellipsis-h ${styles.more__btn}`}
                    ></i>
                  </Link>
                ) : (
                  "__"
                );
                return (
                  <td key={accessor} data-cy={accessor} data-testid="dataCol">
                    {tData}
                  </td>
                );
              })}
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={columns.length}>No results found!!!</td>
        </tr>
      )}
    </tbody>
  );
};

TableBody.propTypes = {
  tableData: PropTypes.array,
  columns: PropTypes.array,
  dataTestid: PropTypes.string,
};

TableBody.defaultProps = {
  tableData: [],
  columns: [],
  dataTestid: "",
};

export default TableBody;
