import { React, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useMatch from "../../hooks/useMatch";
import s from "./styles.module.scss";
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";
import { useAppContext } from "../../context";
import Form from "../Form";
import Topics from "../Topics";
import { useAuth } from "../../context/AuthProvider";
const Navbar = () => {
  const { openModal, modalProps } = useAppContext();
  const { setAuth, isLoggedIn, setIsLoggedIn, login, logout } = useAuth();
  const { tampillog, Settampillog } = useState(isLoggedIn);
  const [namanya, setnamanya] = useState("");
  const match = useMatch("(max-width: 768px)");

  const handleOpenModal = (id) => {
    openModal({
      type: "LoginModal",
      data: { id: id },
    });
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user_nama");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_noreg");
    localStorage.removeItem("user_token");
    // mengatur status autentikasi sebagai logout
    setIsLoggedIn(false);
  };
  useEffect(() => {
    if (isLoggedIn) {
      const token = JSON.parse(localStorage.getItem("authToken"));
      const originalString = token.roles;
      const shortenedString = originalString.split(" ")[0];
      setnamanya(shortenedString);
    }
  });
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
            <nav class='navbar navbar-expand-md floating-right'>
              <button
                class='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarNav'
                aria-controls='navbarNav'
                aria-expanded='false'
                aria-label='Toggle navigation'
              >
                <span class='navbar-toggler-icon'></span>
              </button>
              <div class='collapse navbar-collapse' id='navbarNav'>
                <ul class='navbar-nav'>
                  {isLoggedIn ? (
                    <li class='nav-item'>
                      <a
                        class='nav-link'
                        href='#'
                        onClick={match ? () => {} : () => handleOpenModal(1)}
                      >
                        {namanya}
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  {isLoggedIn ? (
                    <li class='nav-item'>
                      <a
                        class='nav-link'
                        href='#'
                        onClick={match ? () => {} : () => handleLogout()}
                      >
                        Logout
                      </a>
                    </li>
                  ) : (
                    <li class='nav-item'>
                      <a
                        class='nav-link'
                        href='#'
                        onClick={match ? () => {} : () => handleOpenModal(1)}
                      >
                        Login
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </nav>
            <Form isNavbarForm={true} />
          </div>
        </div>{" "}
      </div>
      <Topics />{" "}
    </>
  );
};

export default Navbar;
