import React, {
  useEffect,
  useState,
  useRef,
  
} from "react";
import styles from "./search.module.scss";
import PropTypes from "prop-types";
import Loader from "components/loader/loader";
const Search = (props) => {
  const {
    label,
    placeholder,
    handleChange,
    searchValue,
    suggestionList,
    handleSuggestionSelect,
    suggestionKey,
    loading,
    isRequired,
    error
  } = props;

  const textField = useRef();

  const [suggestionDrawer, setSuggestionDrawer] = useState(false);

  useEffect(() => {
    textField.current.value = searchValue;
 
  }, [searchValue]);

  const handleInputChange = (e) => {
    let value = e?.target?.value.trim();
    handleChange(value);
    setSuggestionDrawer(true);
  };

  const handleSuggestionItem = (elm) => {
    setSuggestionDrawer(false);
    handleSuggestionSelect(elm);
  };

  return (
    <div className={styles.search}>
      <label className={styles.search__label} htmlFor="search" data-testid='label'>{label}{isRequired && <span className={styles.search__mandatory}>*</span>}</label>
      <div className={styles.search__input}>
        <i data-testid='searchIcon' className={`fas fa-search ${styles.search__input__searchIcon}`}></i>
        <input
          id='search'
          autoComplete="off"
          aria-label="search"
          ref={textField}
          placeholder={placeholder}
          className={`${styles.search__input__textbox} ${error && styles.search__input__errorBorder}`}
          type="text"
          onChange={(e) => handleInputChange(e)}
        />
        <br/>
        {error && <span className={styles.search__input__error}>{error}</span>}
      </div>
      { searchValue && suggestionDrawer && (
        <div data-testid='suggestionDrawer' className={styles.search__list}>
          {loading ? (
            <Loader isSmallLoader className={styles.search__list__loader} />
          ) : suggestionList?.length ? (
            <ul className={styles.search__list__listWrapper}>
              {suggestionList?.map((element, index) => (
                <li
                  onClick={() => handleSuggestionItem(element)}
                  key={index}
                  className={styles.listWrapper__item}
                  data-cy={element[suggestionKey]}
                >
                  {element[suggestionKey]}{" "}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.search__list__noData}>No data Found</p>
          )}
        </div>
      )}
    </div>
  );
};

Search.propTypes = {
  label:PropTypes.string,
  placeholder:PropTypes.string,
  handleChange:PropTypes.func,
  searchValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]),
  suggestionList:PropTypes.array,
  handleSuggestionSelect:PropTypes.func,
  suggestionKey:PropTypes.string,
  loading:PropTypes.bool,
  isRequired:PropTypes.bool,
  error:PropTypes.string
};

Search.defaultProps = {
  label:'',
  placeholder:'Search',
  handleChange:()=>{},
  searchValue:'',
  suggestionList:[],
  handleSuggestionSelect:()=>{},
  suggestionKey:'',
  loading:false,
  isRequired:false,
  error:''
};

export default Search;
