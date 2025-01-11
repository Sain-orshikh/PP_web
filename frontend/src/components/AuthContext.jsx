import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [id, setid] = useState('');
  return (
    <AuthContext.Provider value={{ 
      isSignedIn,
      setIsSignedIn, 
      username,
      setusername,
      email,
      setemail,
      password,
      setpassword,
      id,
      setid,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
