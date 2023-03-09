import React, { Component } from "react";
import { useAuth } from "../../../context/AuthProvider";
import Box from "@mui/material/Box";

import Demo from "./AppCrop";
import Login from "../../Login";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Modaluplod = () => {
  const { setAuth, isLoggedIn, setIsLoggedIn, login, logout } = useAuth();
  return <Box sx={style}>{isLoggedIn ? <Demo /> : <Login />}</Box>;
};

export default Modaluplod;
