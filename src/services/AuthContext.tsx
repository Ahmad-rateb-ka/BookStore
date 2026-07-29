import React, { createContext, useState, useContext, useEffect } from "react";

interface AuthContextType {
  userId: string | null;
  userName: string | null;
  setUser: (id: string | null, name: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserIdState] = useState<string | null>(null);
  const [userName, setUserNameState] = useState<string | null>(null);

  useEffect(() => {
    const savedId = localStorage.getItem("user_id");
    const savedName = localStorage.getItem("user_name");
    if (savedId && savedName) {
      setUserIdState(savedId);
      setUserNameState(savedName);
    }
  }, []);

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
