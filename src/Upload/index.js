import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const AppContext = createContext(null);

const recentFromLocalStorage = JSON.parse(localStorage.getItem("recent"));

const AppContextProvider = ({ children }) => {
  const [recent, setRecent] = useState(recentFromLocalStorage || []);
  const [modalProps, setModalProps] = useState({
    isOpen: false,
    type: "",
    data: {},
  });
  const modalRef = useRef(null);

  const openModal = ({ type, data }) => {
    setModalProps({
      isOpen: true,
      type: type,
      data: data,
    });
  };

  const closeModal = () => {
    setModalProps({
      isOpen: false,
      type: "",
      data: {},
    });
  };

  useEffect(() => {
    if (modalProps.isOpen) {
      document.querySelector("body").className = "disable";
    } else {
      document.querySelector("body").className = "";
    }
  }, [modalProps.isOpen]);

  useEffect(() => {
    localStorage.setItem("recent", JSON.stringify(recent));
  }, [recent]);

  return (
    <AppContext.Provider
      value={{
        recent,
        setRecent,
        modalProps,
        openModal,
        closeModal,
        modalRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
