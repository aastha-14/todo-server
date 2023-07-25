import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { AuthProvider } from "@/context/AuthContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex flex-col">
      <main className="flex-1">{children}</main>
    </div>
);

export default Layout;
