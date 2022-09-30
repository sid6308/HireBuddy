import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import formFieldsData from "./form.json";
import Button from "components/button/button";

import { getFormFields, displayErrorMsg, deepCloneObj } from "utils/services";
import { useDispatch, useSelector } from "react-redux";
import { postInterviewCreation } from "store/actions/action";
import Loader from "components/loader/loader";
import { useRouter } from "next/router";
let resultForm = {};

const FinalFeedback = () => {
  const router = useRouter();
  const [formfields, setFormFields] = useState({});
  const dispatch = useDispatch();
  const interviewForm = useSelector(
    (state) => state.interviewReducer.conductInterviewForm
  );
  const isInterviewCreated = useSelector(
    (state) => state.interviewReducer.interviewCreated
  );
  const loading = useSelector((state) => state.interviewReducer.loading);

  useEffect(() => {
    if (isInterviewCreated) {
      router.push("/");
    }
  }, [isInterviewCreated]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setFormFields(deepCloneObj(formFieldsData));
  }, []);

  const inputHandler = (value, key) => {
    let inputValue = value;

    if (value?.target) inputValue = value.target.files?.[0];
    if (Array.isArray(value) && value.length == 1) {
      inputValue = value[0];
    }
    setFormFields((prevState) => {
      prevState[key].value = value;
      prevState[key].error = "";

      if (key === "outcome") {
        prevState["trainable"].error = "";
        prevState["trainings"].error = "";
        if (inputValue.value === "rejected") {
          prevState["trainable"].isRequired = false;
          prevState["trainings"].isRequired = false;
        } else {
          prevState["trainable"].isRequired = true;
          prevState["trainings"].isRequired = true;
        }
      }

      return { ...prevState };
    });

    resultForm[key] = inputValue;
  };

  function validation(obj) {
    let isValidate = true;
    let resultObj = { ...obj };
    let columnkeys = Object.keys(obj);

    for (let key of columnkeys) {
      if (!resultObj[key].isReadOnly && resultObj[key].isRequired) {
        resultObj[key].error = displayErrorMsg(resultObj[key]);
        resultObj[key].error && (isValidate = false);
      }
    }

    return { resultObj, isValidate };
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const { resultObj, isValidate } = validation(formfields);

    setFormFields({ ...resultObj });
    if (isValidate) {
      const finalForm = { ...interviewForm, ...resultForm };
      dispatch(postInterviewCreation(finalForm));
    }
  };

  return (
    <div className={styles.finalfeedback}>
      <form onSubmit={submitHandler} data-testid="form">
        <h2 className={styles.finalfeedback__heading}>Final Feedback</h2>
        <div className={styles.finalfeedback__formWrapper}>
          {Object.keys(formfields).length &&
            Object.keys(formfields)
              .slice(0, -1)
              .map((elm, index) => (
                <div key={index}>
                  {getFormFields(formfields[elm], (value, key) =>
                    inputHandler(value, key)
                  )}
                </div>
              ))}
        </div>

        {formfields["feedback"] && (
          <div className={styles.finalfeedback__feedbackTextbox}>
            {getFormFields(formfields["feedback"], (value, key) =>
              inputHandler(value, key)
            )}
          </div>
        )}

        <div className={styles.finalfeedback__btnWrapper}>
          <Button
            className={styles.finalfeedback__btnWrapper__btn}
            buttonType="solidDefault"
            type="submit"
            data-testid="btn"
          >
            {loading ? <Loader isSmallLoader /> : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FinalFeedback;
