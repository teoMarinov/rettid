import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useState, useEffect } from "react";
import { loginWithToken } from "./servive/auth-service";
import MakeNewSub from "./components/MakeNewSub";
function App() {
  const [userData, setUserData] = useState(null);

  const loginToken = localStorage.getItem("logged in");

  useEffect(() => {
    if (loginToken) {
      loginWithToken(loginToken)
        .then((res) => {
          setUserData(res.data);
        })
        .catch(() => {
          console.log("Login failed on App");
        });
    }
  }, [loginToken]);

  return (
    <AuthContext.Provider value={[userData, setUserData]}>
      <BrowserRouter>
        <Routes>
          {userData ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="creatSub" element={<MakeNewSub />} />
            </>
          ) : (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
