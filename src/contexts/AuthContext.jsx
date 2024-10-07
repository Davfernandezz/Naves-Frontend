
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  passport: null,
  setPassport: () => {},
});

export const AuthProvider = ({ children }) => {
  const [passport, setPassport] = useState(null);

  useEffect(() => {
    const storedPassport = localStorage.getItem("passport");
    if (storedPassport) {
      setPassport(JSON.parse(storedPassport));
    }
  }, []); 

  return (
    <AuthContext.Provider value={{ passport, setPassport }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);