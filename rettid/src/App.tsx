import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useState } from "react";
function App() {
  const [userData, setUserData] = useState(null);

  console.log(userData);

  return (
    <AuthContext.Provider value={[userData, setUserData]}>
      <BrowserRouter>
        <Routes>
          {userData ? (
            <Route path="/" element={<Home />} />
          ) : (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Login />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
