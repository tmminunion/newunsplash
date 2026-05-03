import { React, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useAppContext } from "./context";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Album from "./pages/Album";
import SearchImages from "./pages/SearchImages";
import SearchCollections from "./pages/SearchCollections";
import Collection from "./pages/Collection";
import SearchUsers from "./pages/SearchUsers";
import Topic from "./pages/Topic";
import User from "./pages/User";
import Modal from "./UI/Modal";
import GlobalStyle from "./GlobalStyle";
import Footer from "./components/Footer";
import PageTransition from "./UI/PageTransition";
import { useAuth } from "./context/AuthProvider";

const AnimatedRoutes = () => {
  const location = useLocation();
  const { modalProps } = useAppContext();
  
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route exact path='/' element={<PageTransition><Home /></PageTransition>} />
          <Route exact path='/a/:album' element={<PageTransition><Album /></PageTransition>} />
          <Route path='/p/:name/:sort' element={<PageTransition><SearchImages /></PageTransition>} />
          <Route path='/p/:name/:sort/:orientation' element={<PageTransition><SearchImages /></PageTransition>} />
          <Route path='/c/:name' element={<PageTransition><SearchCollections /></PageTransition>} />
          <Route path='/c/:id/:name' element={<PageTransition><Collection /></PageTransition>} />
          <Route path='/u/:name' element={<PageTransition><SearchUsers /></PageTransition>} />
          <Route path='/t/:slug' element={<PageTransition><Topic /></PageTransition>} />
          <Route path='/:username' element={<PageTransition><User /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <Modal isFilterModal={modalProps.type === "filterModal"} />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
