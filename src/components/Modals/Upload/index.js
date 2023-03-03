import React, { Component } from "react";

import Box from "@mui/material/Box";

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
  return (
    <Box sx={style}>
      <iframe
        src='https://bungtemin.net/uplo'
        width='90%'
        height='100%'
      ></iframe>
    </Box>
  );
};

export default Modaluplod;
