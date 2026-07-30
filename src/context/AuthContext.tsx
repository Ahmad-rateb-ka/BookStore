import React, { createContext, useState, useContext, useEffect } from "react";

// Here We Create The Type Of Inforamtion include in AuthContext
interface AuthContextType {
  userId: string | null;
  userName: string | null;
  setUser: (id: string | null, name: string | null) => void;
  logout: () => void;
}

// We Create The Store to Start Collecting The Data
const AuthContext = createContext<AuthContextType | null>(null);

// Create Provider Which Will Give Us The Data From Store
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // we create the id beacsue we need the to borrow book and take back the book
  const [userId, setUserIdState] = useState<string | null>(null);

  // we create the user name for storing in auth & showing in main section
  const [userName, setUserNameState] = useState<string | null>(null);

  //  here we check if we have old values in local storage we will refresh our values like username , id
  useEffect(() => {
    const savedId = localStorage.getItem("user_id");
    const savedName = localStorage.getItem("user_name");
    if (savedId && savedName) {
      setUserIdState(savedId);
      setUserNameState(savedName);
    }
  }, []);

  // we set the values of username and id in this function with update the value in local storage
  const setUser = (id: string | null, Fullname: string | null) => {
    setUserIdState(id);
    setUserNameState(Fullname);

    if (id && Fullname) {
      localStorage.setItem("user_id", id);
      localStorage.setItem("user_name", Fullname);
    } else {
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");
    }
  };

  //here we will reset the value in this function
  const logout = () => {
    setUserIdState(null);
    setUserNameState(null);
  };

  return (
    <AuthContext.Provider value={{ userId, userName, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
