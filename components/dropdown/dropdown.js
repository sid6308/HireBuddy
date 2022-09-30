import React, { useState, useRef, useEffect } from "react";
import styles from "./dropdown.module.scss";
import PropTypes from "prop-types";

const Dropdown = (props) => {
  const dropdownRef = useRef(null);

  const {
    options,
    isMultiple,
    retriveDropdownValue,
    placeholder,
    label,
    resetValue,
    error,
    isRequired,
    isReadOnly,
    valueIndex,
    name,
  } = props;
  const [selectedValue, setSelectedValue] = useState([]);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const hideDropdown = () => {
    return setDrawerOpen(false);
  };

  useEffect(() => {
    setSelectedValue([]);
  }, [resetValue]);

  useEffect(() => {
    if (valueIndex > -1) {
      let arr = [];
      arr.push(options[valueIndex]);
      setSelectedValue(arr);
    }
  }, [valueIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        hideDropdown();
      }
    };
    document.addEventListener("mousedown", (e) => {
      handleClickOutside(e);
    });

    return () => {
      document.removeEventListener("mousedown", (e) => {
        handleClickOutside(e);
      });
    };
  }, []);

  useEffect(() => {
    retriveDropdownValue(selectedValue);
  }, [selectedValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleMultipleSelect = (e, element) => {
    let isAvailable = e.target.checked;
    let newSelectedValue = [];

    if (isAvailable) {
      newSelectedValue = [...selectedValue, element];
    } else {
      newSelectedValue = selectedValue.filter(
        (elm) => elm.value !== element.value
      );
    }

    setSelectedValue(newSelectedValue);
  };

  const handleSingleSelect = (element) => {
    setSelectedValue([element]);
    hideDropdown();
  };

  function getPlaceholder() {
    let dropdownPlaceholder = "";

    if (selectedValue?.length && isMultiple) {
      dropdownPlaceholder = `${selectedValue.length} Selected`;
    } else if (selectedValue?.length && !isMultiple) {
      dropdownPlaceholder = selectedValue[0]?.label;
    } else {
      dropdownPlaceholder = placeholder;
    }

    return dropdownPlaceholder;
  }

  function handleOpenDrawer() {
    if (isReadOnly) return;
    return setDrawerOpen(!drawerOpen);
  }

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <p data-testid="label" className={styles.dropdown__heading}>
        {label}
        {isRequired && (
          <span className={styles.dropdown__heading__mandatory}>*</span>
        )}
      </p>
      <div
        data-testid="dropdown"
        data-cy={name}
        onClick={handleOpenDrawer}
        className={`${styles.dropdown__title} ${
          error && styles.dropdown__errorBorder
        }`}
      >
        <p data-testid="placeholder">{getPlaceholder()}</p>
        {drawerOpen ? (
          <i className={`fal fa-angle-up ${styles.dropdown__arrowIcon}`} />
        ) : (
          <i className={`fal fa-angle-down ${styles.dropdown__arrowIcon}`} />
        )}
      </div>
      {error && <span className={styles.dropdown__error}>{error}</span>}

      {drawerOpen && options.length ? (
        <div data-testid="drawer" className={styles.dropdown__list}>
          <ul className={styles.dropdown__list__listWrapper}>
            {isMultiple
              ? options?.map((element) => (
                  <li key={element.value} className={styles.listWrapper__item}>
                    {" "}
                    <input
                      data-testid="checkbox"
                      id={element.value}
                      className={styles.listWrapper__item__checkbox}
                      type="checkbox"
                      checked={selectedValue.includes(element)}
                      onChange={(e) => handleMultipleSelect(e, element)}
                    />
                    <label
                      className={styles.listWrapper__item__label}
                      htmlFor={element.value}
                    >
                      {" "}
                      {element.label}{" "}
                    </label>
                  </li>
                ))
              : options?.map((element) => (
                  <li
                    data-cy={element.value}
                    onClick={() => handleSingleSelect(element)}
                    key={element.value}
                    className={styles.listWrapper__item}
                  >
                    {element.label}{" "}
                  </li>
                ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array,
  isMultiple: PropTypes.bool,
  retriveDropdownValue: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  isRequired: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  resetValue: PropTypes.string,
  valueIndex: PropTypes.number,
  name: PropTypes.string,
};

Dropdown.defaultProps = {
  options: [],
  isMultiple: false,
  retriveDropdownValue: () => {},
  placeholder: "Choose",
  label: "",
  error: "",
  isRequired: false,
  isReadOnly: false,
  name: "",
};

export default Dropdown;
