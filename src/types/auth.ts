import { User } from "firebase/auth";
import React from "react";

export interface IAuthProps {
  children: React.ReactNode;
}

export interface IAuthFormProps {
  email: string;
  password: string;
}

export interface IAuthValueProps {
  currentUser: User | undefined;
  signup: (props: IAuthFormProps) => void;
  signin: (props: IAuthFormProps) => void;
  logout: () => void;
  userInfo: any;
}
