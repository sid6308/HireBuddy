import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Button from "components/button/button";
import Search from "components/search/search";
import axios from "utils/axios";
import {
  debounce,
  getFormFields,
  displayErrorMsg,
  deepCloneObj,
} from "utils/services";
import formFieldsData from "./form.json";
import { useDispatch } from "react-redux";
import { setFormValues } from "store/actions/action";
import { useRouter } from "next/router";
let resultForm = {};

const InterviewDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formfields, setFormFields] = useState({});

  const [searchText, setSearchText] = useState("");
  const [searchError, setSearchError] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [suggestionList, setSuggestionList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormFields(deepCloneObj(formFieldsData));
  }, []);

  const handleSearchChange = (value) => {
    setSearchText(value);
    if (!value) return;

    setLoading(true);
    axios.post("/user?search=" + value).then((res) => {
      setSuggestionList(res.data);
      setSearchError("");
      setLoading(false);
    });
  };

  const debouncedHandleChange = debounce(handleSearchChange, 300);
  const handleSuggestionSelect = (elm) => {
    setSearchText(elm.oracleID);
    setSuggestionList([]);
    setSelectedUser(elm);
    setSearchError("");
    resultForm = { ...resultForm, ...elm };
    const coloumn = "interviewerInformation";
    setFormFields((prevState) => {
      prevState[coloumn].interviewer_firstname.value = elm.first_name;
      prevState[coloumn].interviewer_lastname.value = elm.last_name;
      prevState[coloumn].interviewer_email.value = elm.email;
      prevState[coloumn].interviewer_careerStage.value = elm.career_stage;
      prevState[coloumn].oracleId.value = elm.oracleID;
      prevState[coloumn].oracleId.error = "";

      return { ...prevState };
    });
  };

  const inputHandler = (value, key, section) => {
    let inputValue = value;

    if (value?.target) inputValue = value.target.files?.[0]?.name;
    if (Array.isArray(value) && value.length == 1) {
      inputValue = value[0];
    }
    setFormFields((prevState) => {
      prevState[section][key].value = value;
      prevState[section][key].error = "";

      return { ...prevState };
    });
    resultForm[key] = inputValue;
  };

  function validation(obj) {
    let isValidate = true;
    let resultObj = { ...obj };
    let columnkeys = Object.keys(obj);

    for (let key of columnkeys) {
      for (let item in resultObj[key]) {
        if (
          !resultObj[key][item].isReadOnly &&
          resultObj[key][item].isRequired
        ) {
          resultObj[key][item].error = displayErrorMsg(resultObj[key][item]);
          resultObj[key][item].error && (isValidate = false);
        }
      }
    }
    if (!Object.keys(selectedUser).length || !searchText) {
      let errorObj = {
        type: "search",
        label: "Oracle ID",
      };
      isValidate = false;
      setSearchError(displayErrorMsg(errorObj));
    }

    return { resultObj, isValidate };
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const { resultObj, isValidate } = validation(formfields);

    setFormFields({ ...resultObj });
    if (isValidate) {
      dispatch(setFormValues(resultForm));
      router.push("/conductInterview/technicalRound");
    }
  };

  return (
    <div className={styles.interviewDetails}>
      <form data-testid="form" onSubmit={submitHandler}>
        <h2 className={styles.interviewDetails__heading}>Interview Details</h2>
        <div className={styles.interviewDetails__formWrapper}>
          {Object.keys(formfields).length &&
            Object.keys(formfields["interviewDetails"]).map((elm, index) => (
              <div key={index}>
                {getFormFields(
                  formfields["interviewDetails"][elm],
                  (value, key) => inputHandler(value, key, "interviewDetails")
                )}
              </div>
            ))}
        </div>
        <br />
        <h2 className={styles.interviewDetails__heading}>
          Candidate Information
        </h2>
        <div className={styles.interviewDetails__formWrapper}>
          {Object.keys(formfields).length &&
            Object.keys(formfields["candidateInformation"]).map(
              (elm, index) => (
                <div key={index}>
                  {getFormFields(
                    formfields["candidateInformation"][elm],
                    (value, key) =>
                      inputHandler(value, key, "candidateInformation")
                  )}
                </div>
              )
            )}
        </div>
        <br />
        <h2 className={styles.interviewDetails__heading}>
          Interviewer Information
        </h2>
        <div className={styles.interviewDetails__formWrapper}>
          <Search
            suggestionKey="oracleID"
            suggestionList={suggestionList}
            label="Oracle Id"
            placeholder="Search Oracle Id"
            handleChange={debouncedHandleChange}
            searchValue={searchText}
            handleSuggestionSelect={handleSuggestionSelect}
            loading={loading}
            isRequired
            error={searchError}
          />

          {Object.keys(formfields).length &&
            Object.keys(formfields["interviewerInformation"])
              .slice(1)
              .map((elm, index) => (
                <div key={index}>
                  {getFormFields(
                    formfields["interviewerInformation"][elm],
                    (value, key) =>
                      inputHandler(value, key, "interviewerInformation")
                  )}
                </div>
              ))}
        </div>
        <br />
        <div className={styles.interviewDetails__btnWrapper}>
          <Button data-testid="btn" buttonType="solidDefault" type="submit">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InterviewDetails;
