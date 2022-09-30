import InterviewTableHead from "components/InterviewTableHead/InterviewTableHead";
import FilterList from "components/FilterList/FilterList";
import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { COLUMNS } from "./columns";
import styles from "./InterviewList.module.scss";
import useTable from "components/hooks/useTable";
import TableFooter from "components/TableFooter/TableFooter";
import TableBody from "components/TableBody/TableBody";

const InterviewList = ({ data }) => {
  const columns = useMemo(() => COLUMNS, []);

  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState(tableData);
  const [page, setPage] = useState(1);
  const [sortIcon, setSortIcon] = useState(true);
  const { slice, range } = useTable(filteredData, page, 4);

  useEffect(() => {
    const getData = () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        if (user.role === "admin") {
          setTableData(data);
          setFilteredData(data);
        } else {
          const userData = data.filter(
            (obj) => obj["oracleID"] === user.oracleID
          );

          const finalData = userData.map((item, index) => {
            delete item["uid"];
            return {
              ...item,
              uid: index + 1,
            };
          });

          setTableData(finalData);
          setFilteredData(finalData);
        }
      }
    };

    getData();
  }, [data]);

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...filteredData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setFilteredData(sorted);
    }
  };

  const handleFiltering = (filterColumn, filterValue) => {
    let filteredTableData;
    if (filterColumn && filterValue.length) {
      filteredTableData = [...tableData].filter((data) => {
        if (filterColumn === "month" || filterColumn === "year") {
          const date = new Date(data["date"]);
          return filterColumn === "year"
            ? filterValue.includes(date.getFullYear())
            : filterValue.includes(date.getMonth() + 1);
        } else {
          return filterValue.includes(data[filterColumn]?.value);
        }
      });
      setFilteredData(filteredTableData);
    } else if (filterColumn && filterValue.length == 0) {
      setFilteredData(tableData);
    }
    setSortIcon((prevSortIcon) => !prevSortIcon);
  };

  return (
    <>
      <h2 data-testid="interviewListHeading">Interview List</h2>
      <FilterList handleFiltering={handleFiltering} />
      <div className={styles.interviewList}>
        <table className={styles.interviewList__table}>
          <InterviewTableHead
            columns={columns}
            handleSorting={handleSorting}
            sortIcon={sortIcon}
            dataTestid="header"
          />
          <TableBody columns={columns} tableData={slice} dataTestid="body" />
        </table>
      </div>
      <TableFooter
        range={range}
        slice={slice}
        setPage={setPage}
        page={page}
        dataTestId="footer"
      />
    </>
  );
};

export default InterviewList;

InterviewList.propTypes = {
  data: PropTypes.array,
};

InterviewList.defaultProps = {
  data: [],
};
