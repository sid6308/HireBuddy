import React from "react";

import Header from "components/header/header";
import { useRouter } from "next/router";

const Layout = (props) => {
  const router = useRouter();

  const showHeader = router.pathname === "/login" ? false : true;

  return (
    <>
      {showHeader && <Header />}
      <main className="main">{props.children}</main>
    </>
  );
};

export default Layout;
