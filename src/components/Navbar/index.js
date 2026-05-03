import { React, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, LogOut, User as UserIcon, Menu, X, Search } from "lucide-react";
import useMatch from "../../hooks/useMatch";
import s from "./styles.module.scss";
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";
import { useAppContext } from "../../context";
import Form from "../Form";
import Topics from "../Topics";
import { useAuth } from "../../context/AuthProvider";

const Navbar = () => {
  const { openModal } = useAppContext();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [namanya, setnamanya] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      try {
        const tokenStr = localStorage.getItem("authToken");
        if (tokenStr) {
          const token = JSON.parse(tokenStr);
          const originalString = token.roles || "";
          const shortenedString = originalString.split(" ")[0];
          setnamanya(shortenedString || "User");
        }
      } catch (e) {
        console.error("Error parsing auth token", e);
      }
    }
  }, [isLoggedIn]);

  return (
    <>
      <header 
        className={`${s.navbar_container} ${isScrolled ? s.scrolled : ""} glass`}
      >
        <div className="container">
          <div className={s.navbar_inner}>
            <Link to="/" className={s.logo_wrapper}>
              <Logo className={s.logo_svg} />
              <span className={s.logo_text}>BT-Gallery</span>
            </Link>

            {!match && (
              <div className={s.search_wrapper}>
                <Form isNavbarForm={true} />
              </div>
            )}

            <nav className={s.nav_links}>
              {isLoggedIn ? (
                <>
                  <button className={s.user_btn} onClick={() => handleOpenModal(1)}>
                    <UserIcon size={18} />
                    <span>{namanya}</span>
                  </button>
                  <button className={s.logout_btn} onClick={handleLogout}>
                    <LogOut size={18} />
                    {!match && <span>Logout</span>}
                  </button>
                </>
              ) : (
                <button className={s.login_btn} onClick={() => handleOpenModal(1)}>
                  <LogIn size={18} />
                  <span>Login</span>
                </button>
              )}
              
              {match && (
                <button 
                  className={s.menu_toggle} 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && match && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`${s.mobile_menu} glass`}
          >
            <div className="container">
              <div className={s.mobile_search}>
                <Form isNavbarForm={true} />
              </div>
              <Topics />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!match && <Topics />}
    </>
  );
};

export default Navbar;
