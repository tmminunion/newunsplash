import React from "react";
import { useAuth } from "../../../context/AuthProvider";
import Demo from "./AppCrop";
import Login from "../../Login";
import s from "./styles.module.scss";

const Modalupload = () => {
  const { isLoggedIn } = useAuth();
  
  return (
    <div className={`${s.upload_wrapper} glass`}>
      {isLoggedIn ? <Demo /> : <Login />}
    </div>
  );
};

export default Modalupload;
