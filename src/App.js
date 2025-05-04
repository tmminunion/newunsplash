import { React, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { useAuth } from "./context/AuthProvider";
const App = () => {
  const { modalProps } = useAppContext();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/a/:album' element={<Album />} />
        <Route path='/p/:name/:sort' element={<SearchImages />} />
        <Route path='/p/:name/:sort/:orientation' element={<SearchImages />} />
        <Route path='/c/:name' element={<SearchCollections />} />
        <Route path='/c/:id/:name' element={<Collection />} />
        <Route path='/u/:name' element={<SearchUsers />} />
        <Route path='/t/:slug' element={<Topic />} />

        <Route path='/:username' element={<User />} />
      </Routes>
      <Footer />
      <Modal isFilterModal={modalProps.type === "filterModal"} />
    </Router>
  );
};

export default App;
