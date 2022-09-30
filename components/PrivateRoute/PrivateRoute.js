import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "./PrivateRoute.module.scss";
import Loader from "components/loader/loader";
import ClientOnly from "components/clientOnly/clientOnly";

function PrivateRoute({ protectedRoutes, children }) {
  const router = useRouter();
  const { loggedIn, loggingIn } = useSelector((state) => state.login);

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    if (!loggingIn && !loggedIn && pathIsProtected) {
      router.push("/login");
    }
  }, [loggingIn, loggedIn, pathIsProtected]); // eslint-disable-line react-hooks/exhaustive-deps

  if ((loggingIn || !loggedIn) && pathIsProtected) {
    return <Loader className={styles.pageLoader} />;
  }

  return children;
}

const ClientPrivateRouter = ({ protectedRoutes, children }) => {
  return (
    <ClientOnly>
      <PrivateRoute protectedRoutes={protectedRoutes}>{children}</PrivateRoute>
    </ClientOnly>
  );
};

ClientPrivateRouter.propTypes = {
  protectedRoutes: PropTypes.array,
  children: PropTypes.element,
};

PrivateRoute.propTypes = {
  protectedRoutes: PropTypes.array,
  children: PropTypes.element,
};

export default ClientPrivateRouter;
