import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Button from "components/button/button";
import { userActions } from "../../store/actions/user.action";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  const logoutHandler = () => {
    dispatch(userActions.logout());
    router.push("/login");
  };

  const goToHome = () => {
    return router.push("/");
  };

  return (
    <div className={styles.header}>
      <h1 onClick={goToHome} className={styles.header__logo}>
        Hire<span className={styles.header__buddy}>Buddy</span>
      </h1>
      <ul className={styles.header__menu}>
        <li
          data-testid="home"
          className={`${styles.header__menu__item} ${
            router?.pathname === "/" && styles.header__menu__item__active
          }`}
        >
          <Link href="/">Home</Link>
        </li>
        <li
          data-testid="conductInterview"
          className={`${styles.header__menu__item} ${
            router?.pathname?.includes("/conductInterview") &&
            styles.header__menu__item__active
          }`}
          data-cy='conductInterview'
        >
          <Link
            href={
              router?.pathname?.includes("/conductInterview")
                ? ""
                : "/conductInterview/interviewDetails"
            }
          >
            Conduct Interview
          </Link>
        </li>
      </ul>

      <div className={styles.header__profile}>
        <p className={styles.header__profile__user}>
          Welcome {user && user.first_name}
        </p>
        <Button
          buttonType="solidDefault"
          className={styles.header__profile__btn}
          handleClick={logoutHandler}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
