import React from "react";
import PropTypes from "prop-types";
import Input from "components/input/input";
import styles from "./index.module.scss";
import axios from "utils/axios";

const InterviewDetail = ({ obj }) => {
  const renderField = (val, i) => {
    return (
      <Input
        type={val === "feedback" ? "textarea" : "text"}
        key={i}
        readOnly
        label={val.replace("_", " ")}
        value={getValue(val)}
        aria-label={val}
        defaultValue={val === "feedback" ? getValue(val) : undefined}
      />
    );
  };

  const getValue = (key) => {
    let val = "";
    if (Array.isArray(obj[key])) {
      const getDropdownValue = obj[key].reduce(
        (item, acc, idx) => `${item} ${idx !== 0 ? "," : ""} ${acc.label}`,
        ""
      );
      val = getDropdownValue;
    } else if (typeof obj[key] === "object") {
      val = obj[key].label;
    } else {
      val = obj[key];
    }

    return val;
  };

  const objKeys = Object.keys(obj).filter((elm) => elm !== "feedback");
  return (
    <>
      <form>
        <div className={styles.interviewDetail}>
          <h2 className={styles.interviewDetail__heading}>Interview Detail</h2>
          <div className={styles.interviewDetail__formWrapper}>
            {objKeys.map(
              (val, i) =>
                val !== "id" && val !== "technicalRound" && renderField(val, i)
            )}
          </div>
          <div className={styles.interviewDetail__feedbackWrapper}>
            {renderField("feedback", 20)}
          </div>
          <br />
        </div>
      </form>
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    const res = await axios.get(`/interviewDetail/${params.id}`);

    return {
      props: {
        obj: res.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error,
      },
    };
  }
};

export default InterviewDetail;

InterviewDetail.propTypes = {
  obj: PropTypes.object,
};

InterviewDetail.defaultProps = {
  obj: {},
};
