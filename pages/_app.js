import React from "react";
import "../styles/globals.scss";
import PropTypes from "prop-types";
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import Layout from "container/layout/layout";
import ClientPrivateRouter from "components/PrivateRoute/PrivateRoute";

function MyApp({ Component, pageProps }) {
  const protectedRoutes = [
    "/",
    "/conductInterview/finalFeedback",
    "/conductInterview/interviewDetails",
    "/conductInterview/technicalDetails",
    "/interviewDetail/[:id]",
  ];
  return (
    <>
      <Provider store={store}>
        <ClientPrivateRouter protectedRoutes={protectedRoutes}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ClientPrivateRouter>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};
