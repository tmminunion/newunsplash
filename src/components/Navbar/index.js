import React from "react";
import { Link } from "react-router-dom";

import s from "./styles.module.scss";
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";

import Form from "../Form";
import Topics from "../Topics";

const Navbar = () => {
  return (
    <>
      {" "}
      <div className={s.navbar_outer}>
        <div className={s.topnav}>
          {" "}
          <div className={s.navbar_inner}>
            <Link to={"/"} className={s.navbar_logo}>
              <Logo />
            </Link>
            <Form isNavbarForm={true} />{" "}
            <div className={s.topnavright}>
              <div class='float-right'>
                <a href='#search'>Login</a>
                <a href='#about'>Akun</a>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
      <Topics />{" "}
    </>
  );
};

export default Navbar;
