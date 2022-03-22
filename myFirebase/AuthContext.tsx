import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';

import { auth } from './firebase';

type ValueType = {
  currentUser: any,
  login: any,
  signup: any,
  logout: any,
  resetPassword: any,
} | null;

const AuthContext = React.createContext<ValueType>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children } : any) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email : string, password : string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email : string, password : string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email : string) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => auth.onAuthStateChanged((user: any) => {
    setCurrentUser(user);
    setLoading(false);
  }), []);

  const value : ValueType = useMemo(() => ({
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
  }), [currentUser]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
