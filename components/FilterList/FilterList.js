import Dropdown from "components/dropdown/dropdown";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./FilterList.module.scss";

const FilterList = ({ handleFiltering }) => {
  const [columns, setColumns] = useState([]);
  const [columnValues, setColumnValues] = useState([]);
  const [filterColumn, setfilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState([]);

  useEffect(() => {
    handleFiltering(filterColumn, filterValue);
  }, [filterValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const FILTER_DATA = [
    {
      name: { label: "Month", value: "month" },
      values: [
        { label: 1, value: 1 },
        { label: 2, value: 2 },
        { label: 3, value: 3 },
        { label: 4, value: 4 },
        { label: 5, value: 5 },
        { label: 6, value: 6 },
        { label: 7, value: 7 },
        { label: 8, value: 8 },
        { label: 9, value: 9 },
        { label: 10, value: 10 },
        { label: 11, value: 11 },
        { label: 12, value: 12 },
      ],
    },

    {
      name: { label: "Year", value: "year" },
      values: [
        { label: 2018, value: 2018 },
        { label: 2019, value: 2019 },
        { label: 2020, value: 2020 },
        { label: 2021, value: 2021 },
        { label: 2022, value: 2022 },
      ],
    },
    {
      name: { label: "Career stage applied", value: "candidate_careerStage" },
      values: [
        { label: "Junior Associate", value: "juniorAssociate" },
        { label: "Associate L1", value: "associateL1" },
        { label: "Associate L2", value: "associateL2" },
        { label: "Sr Associate L1", value: "srAssociateL1" },
        { label: "Sr Associate L2", value: "srAssociateL2" },
        { label: "Manager", value: "manager" },
        { label: "Sr Manager", value: "srManager" },
      ],
    },
    {
      name: { label: "Career stage selected", value: "recommendedCareerStage" },
      values: [
        { label: "Junior Associate", value: "juniorAssociate" },
        { label: "Associate L1", value: "associateL1" },
        { label: "Associate L2", value: "associateL2" },
        { label: "Sr Associate L1", value: "srAssociateL1" },
        { label: "Sr Associate L2", value: "srAssociateL2" },
        { label: "Manager", value: "manager" },
        { label: "Sr Manager", value: "srManager" },
      ],
    },
    {
      name: { label: "Outcome", value: "outcome" },
      values: [
        { label: "Selected", value: "selected" },
        { label: "Rejected", value: "rejected" },
      ],
    },
  ];

  useEffect(() => {
    setColumns(FILTER_DATA);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const changeColumn = (selectedCol) => {
    if (selectedCol.length) {
      setfilterColumn(selectedCol[0]?.value);
      let filteredColumnValues = columns.find(
        (c) => c.name.label === selectedCol[0]?.label
      )?.values;
      setColumnValues(filteredColumnValues);
    }
  };

  const changeValue = (selectedVal) => {
    const selectedValueOptions = selectedVal.map((v) => v?.value);
    setFilterValue(selectedValueOptions);
  };

  const filterColumnOptions = columns.map((c) => c.name);

  return (
    <div className={styles.filter} data-testid="filter">
      <div className={styles.filter__dropdown}>
        <Dropdown
          options={filterColumnOptions}
          placeholder="Choose Filter type"
          retriveDropdownValue={changeColumn}
          role="filter-column"
        />

        <Dropdown
          options={columnValues}
          isMultiple
          placeholder="Choose Filter Value"
          retriveDropdownValue={changeValue}
          resetValue={filterColumn}
        />
      </div>
    </div>
  );
};

FilterList.propTypes = {
  handleFiltering: PropTypes.func,
};

FilterList.defaultProps = {
  handleFiltering: () => {},
};

export default FilterList;
