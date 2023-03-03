import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useAppContext } from "./context";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchImages from "./pages/SearchImages";
import SearchCollections from "./pages/SearchCollections";
import Collection from "./pages/Collection";
import SearchUsers from "./pages/SearchUsers";
import Topic from "./pages/Topic";
import User from "./pages/User";
import Modal from "./UI/Modal";

const App = () => {
  const { modalProps } = useAppContext();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/p/:name/:sort" element={<SearchImages />} />
        <Route path="/p/:name/:sort/:orientation" element={<SearchImages />} />
        <Route path="/c/:name" element={<SearchCollections />} />
        <Route path="/c/:id/:name" element={<Collection />} />
        <Route path="/u/:name" element={<SearchUsers />} />
        <Route path="/t/:slug" element={<Topic />} />

        <Route path="/:username" element={<User />} />
      </Routes>
      <Modal isFilterModal={modalProps.type === "filterModal"} />
    </Router>
  );
};

export default App;
