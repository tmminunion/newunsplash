import React from "react";
import { Link, useLocation } from "react-router-dom";

import s from "./styles.module.scss";
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";

import Form from "../Form";
import Topics from "../Topics";
import RenderIf from "../../utils/RenderIf";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isTopicPage = location.pathname.slice(0, 2) === "/t";

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
      <RenderIf isTrue={isHomePage || isTopicPage}>
        <Topics />
      </RenderIf>
    </>
  );
};

export default Navbar;
