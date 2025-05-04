import { useContext, createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
export const AuthContext = createContext({});

function validateToken(token) {
  try {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Token expired
      return false;
    } else {
      // Token valid
      return true;
    }
  } catch (error) {
    // Invalid token
    return false;
  }
}

const checkIsLoggedIn = () => {
  // mengambil token autentikasi dari local storage
  const token = localStorage.getItem("authToken");
  const tokennya = localStorage.getItem("user_token");
  const isValid = validateToken(tokennya);

  // jika token tidak null, maka pengguna telah login
  // if (token && isValid) {
  //   console.log(`user : ${localStorage.getItem("user_nama")}`);
  //   return true;

  // }

  if (token && tokennya) {
    return true;
  }

  localStorage.removeItem("authToken");
  localStorage.removeItem("user_nama");
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_noreg");
  localStorage.removeItem("user_token");
  // jika tidak, pengguna belum login
  return false;
};
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(checkIsLoggedIn());

  // fungsi untuk login
  const login = (token) => {
    console.log("klik di Login");
    // menyimpan token autentikasi ke dalam local storage
    localStorage.setItem("authToken", token);

    // mengatur status autentikasi sebagai login
    setIsLoggedIn(true);
    console.log("LOGIN");
  };

  // fungsi untuk logout
  const logout = () => {
    console.log("klik logout");
    // menghapus token autentikasi dari local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user_nama");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_noreg");
    localStorage.removeItem("user_token");
    // mengatur status autentikasi sebagai logout
    setIsLoggedIn(false);
  };

  // memeriksa status autentikasi setelah refresh halaman
  useEffect(() => {
    setIsLoggedIn(checkIsLoggedIn());
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, isLoggedIn, setIsLoggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// fungsi untuk mengakses konteks autentikasi
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
