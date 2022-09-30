import React from "react";
import PropTypes from "prop-types";
import axios from "utils/axios";
import styles from "../styles/Home.module.scss";
import InterviewList from "components/InterviewList/InterviewList";

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <InterviewList data={data} />
    </div>
  );
}

export async function getServerSideProps() {
  const response = await axios.get("/interviews");

  const res = await response.data;

  return {
    props: {
      data: res,
    },
  };
}

Home.propTypes = {
  data: PropTypes.array,
};

Home.defaultProps = {
  data: [],
};
