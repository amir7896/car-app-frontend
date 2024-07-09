import React, { createContext, useContext, useEffect, useState } from "react";

import LocalStorage from "../managers/LocalStorage";
import authApi from "../services/apis/Auth.Api";

const authContext = createContext();
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = LocalStorage.getUser();
    const storedToken = LocalStorage.getToken();
    if (storedUser && storedToken) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const logOut = async () => {
    LocalStorage.removeUser();
    LocalStorage.removeToken();
    setIsLoggedIn(false);
    setUser(null);
  };

  const signin = async (credentials) => {
    const response = await authApi.loginUser(credentials);
    if (response.success) {
      setUser(response.user);
      setIsLoggedIn(true);
      LocalStorage.setUser(response.user);
      LocalStorage.setToken(response.token);
    }

    console.log("Response  in use auth:", response);

    return response;
  };

  const signout = () => {
    logOut();
  };

  return {
    user,
    signin,
    signout,
    isLoggedIn,
  };
}
