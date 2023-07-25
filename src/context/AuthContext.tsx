import React, { useContext, useEffect, useRef, useState } from "react";
import { auth, db } from "@/utils/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { IAuthProps, IAuthFormProps, IAuthValueProps } from "@/types/auth";
import { useRouter } from "next/router";

const AuthContext = React.createContext<IAuthValueProps | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props: IAuthProps) {
  const [currentUser, setCurrentUser] = useState<User>();
  const [loading, setLoading] = useState<Boolean>(true);
  const userInfo = useRef();
  const router = useRouter()
  async function signup(props: IAuthFormProps) {
    const { email, password } = props;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async function signin(props: IAuthFormProps) {
    const { email, password } = props;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/')
      return { error: false };
    } catch (error: any) {
      console.log(error.code);
      return { error: true, code: error.code };
    }
  }

  async function logout() {
    try {
      console.log(auth)
      const res = await signOut(auth);
      console.log('res', res)
      router.push('/login')
      return;
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      user && setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: IAuthValueProps = {
    currentUser,
    signup,
    signin,
    logout,
    userInfo,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
}
