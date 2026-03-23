import { useState } from "react";
import { AuthContext } from "./AuthContext";


const AuthProvider = ({ children }) => {


  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;
