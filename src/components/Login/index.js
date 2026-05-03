import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User as UserIcon, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";
import s from "./styles.module.scss";
import { useAppContext } from "../../context";

const Login = () => {
  const { setAuth, isLoggedIn, setIsLoggedIn } = useAuth();
  const { closeModal } = useAppContext();
  const userRef = useRef();

  const ADMIN = process.env.REACT_APP_ADMIN;
  const PASS = process.env.REACT_APP_PASS;
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user === ADMIN && pwd === PASS) {
      const accessToken = "dummy-token";
      const roles = "Admin";
      const id = "1";

      setAuth({ user, id, roles, accessToken });

      localStorage.setItem("authToken", JSON.stringify({ user, id, roles, accessToken }));
      localStorage.setItem("user_nama", roles);
      localStorage.setItem("user_id", id);
      localStorage.setItem("user_noreg", user);
      localStorage.setItem("user_token", accessToken);

      setUser("");
      setPwd("");
      setIsLoggedIn(true);
    } else {
      setErrMsg("Kesalahan username atau password");
    }
  };

  return (
    <div className={`${s.login_container} glass`}>
      <AnimatePresence mode="wait">
        {isLoggedIn ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={s.success_state}
            key="success"
          >
            <div className={s.icon_wrapper}>
              <CheckCircle2 size={64} color="var(--primary)" />
            </div>
            <h2>Logged in successfully!</h2>
            <p>Welcome back, {user || "Admin"}. You can now explore all features.</p>
            <button className={s.primary_btn} onClick={closeModal}>
              Go to Gallery <ArrowRight size={18} />
            </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={s.login_form_wrapper}
            key="form"
          >
            <div className={s.form_header}>
              <div className={s.logo_icon}>
                <Lock size={32} />
              </div>
              <h1>Welcome Back</h1>
              <p>Please enter your credentials to access your account.</p>
            </div>

            <form onSubmit={handleSubmit} className={s.form}>
              <div className={s.input_group}>
                <label htmlFor="username">Username / Noreg</label>
                <div className={s.input_wrapper}>
                  <UserIcon size={18} className={s.field_icon} />
                  <input
                    type='text'
                    id='username'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    placeholder='Enter your username'
                    required
                  />
                </div>
              </div>

              <div className={s.input_group}>
                <label htmlFor="password">Password</label>
                <div className={s.input_wrapper}>
                  <Lock size={18} className={s.field_icon} />
                  <input
                    type='password'
                    id='password'
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    placeholder='••••••••'
                    required
                  />
                </div>
              </div>

              {errMsg && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={s.error_msg}
                >
                  <AlertCircle size={16} />
                  <span>{errMsg}</span>
                </motion.div>
              )}

              <button type='submit' className={s.primary_btn}>
                Login to Account
              </button>
            </form>

            <div className={s.form_footer}>
              <p>
                <small>
                  Login menggunakan Noreg (7 digit) dan Tanggal Lahir (ddmmyy).
                </small>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
