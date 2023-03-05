import React from "react";
import { Link } from "react-router-dom";

import s from "./styles.module.scss";
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";

import Form from "../Form";
import Topics from "../Topics";

const Navbar = () => {
  return (
    <>
      <div className={s.navbar_outer}>
        <div className={s.navbar_inner}>
          <Link to={"/"} className={s.navbar_logo}>
            <Logo />
          </Link>
          <Form isNavbarForm={true} />
        </div>
      </div>

      <Topics />
    </>
  );
};

export default Navbar;
