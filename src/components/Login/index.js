import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import s from "./styles.module.scss";
//import { LoginUser } from "../../api";
import { useAppContext } from "../../context";
const Login = () => {
  const { setAuth, isLoggedIn, setIsLoggedIn } = useAuth();
  const { closeModal } = useAppContext();
  const userRef = useRef();
  const errRef = useRef();
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
      const accessToken = "dummy-token"; // bisa diganti dengan token generator kalau mau
      const roles = "Admin";
      const id = "1";

      setAuth({ user, id, roles, accessToken });

      localStorage.setItem(
        "authToken",
        JSON.stringify({ user, id, roles, accessToken })
      );
      localStorage.setItem("user_nama", roles);
      localStorage.setItem("user_id", id);
      localStorage.setItem("user_noreg", user);
      localStorage.setItem("user_token", accessToken);

      setUser("");
      setPwd("");
      setIsLoggedIn(true);
    } else {
      setErrMsg("kesalahan username atau password");
    }

    // LoginUser(JSON.stringify({ user, pwd }))
    //   .then((result) => {
    //     console.log(result.data);
    //     const accessToken = result?.data?.token;
    //     const roles = result?.data?.nama;
    //     const id = result?.data?.id;
    //     setAuth({ user, id, roles, accessToken });
    //     localStorage.setItem(
    //       "authToken",
    //       JSON.stringify({ user, id, roles, accessToken })
    //     );
    //     localStorage.setItem("user_nama", roles);
    //     localStorage.setItem("user_id", id);
    //     localStorage.setItem("user_noreg", user);
    //     localStorage.setItem("user_token", accessToken);
    //     setUser("");
    //     setPwd("");

    //     setIsLoggedIn(true);
    //   })
    //   .catch((error) => {
    //     setErrMsg("kesalahan username atau password");
    //     console.log(error);
    //   });
  };

  return (
    <>
      <div className={s.modal}>
        <div className={s.modal_header}>Silahkan Login</div>

        {isLoggedIn ? (
          <section>
            <div class='container'>
              <div class='row text-center'>
                <div class='col col-lg-5 col-md-9 col-sm-10 m-auto'>
                  <div class='card borderless shadow m-5'>
                    <div class='row align-items-center'>
                      <div class='col-md-12'>
                        <div class='card-body'>
                          <h1>You are logged in!</h1>
                          <br />
                          <p>
                            <a href='#' onClick={closeModal()}>
                              Go to Home
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section>
            <div class='container'>
              <div class='row text-center'>
                <div class='col col-lg-5 col-md-9 col-sm-10 m-auto'>
                  <div class='card borderless shadow m-5'>
                    <div class='row align-items-center'>
                      <div class='col-md-12'>
                        <div class='card-body'>
                          <h4 class='mb-3 f-w-400'>Login</h4>
                          <hr />
                          <div
                            ref={errRef}
                            className={
                              errMsg
                                ? " alert alert-danger errmsg"
                                : "offscreen"
                            }
                            aria-live='assertive'
                          >
                            {errMsg}
                          </div>
                          <form onSubmit={handleSubmit}>
                            <div class='form-group mb-3'>
                              <input
                                type='text'
                                id='username'
                                ref={userRef}
                                autoComplete='off'
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                className='form-control'
                                placeholder='Username'
                                name='username'
                                autocomplete='off'
                                required
                              />
                            </div>
                            <div class='form-group mb-4'>
                              <input
                                type='password'
                                id='password'
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                className='form-control'
                                placeholder='Password'
                                name='password'
                                required
                              />
                            </div>

                            <button
                              type='submit'
                              className='btn btn-block btn-primary mb-4'
                            >
                              Login
                            </button>
                          </form>
                          <hr />
                          <h5>
                            <small>
                              Login dengan menggunakan Noreg 7 digit (0123456)
                              dan tanggal lahir format ddmmyy (01051986)
                            </small>
                          </h5>
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        <div className={s.modal_footer}></div>
      </div>
    </>
  );
};

export default Login;
