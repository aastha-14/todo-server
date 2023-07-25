import React, { useState } from "react";
import Input from "./common/Input";
import Button from "./common/Button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Login: React.FC<{
  title: string;
  type: "register" | "login";
}> = ({ title, type }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLogging, setIsLogging] = useState(true);
  const auth = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: "email" | "password") => {
    setError("")
    setFormData({ ...formData, [field]: e.target.value });
  }

  const handleFormSubmission = async (e: React.FormEvent) => {
    console.log('this is true')
    setIsLogging(true);
    const { email, password } = formData;
    console.log(email, password)
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter a valid email and password");
      return;
    }
    console.log(isLogging)
    if (isLogging) {
      const res: any = await auth?.signin({ email, password });
      console.log(res)
      // set is logging to false
      setIsLogging(false);
      if (!res.error) return;

      // handle wrong password
      if (res.error && res.code === "auth/wrong-password") {
        setError("Invalid email or password");
        return;
      }

      //  handle user not found
      if (res.error && res.code === "auth/user-not-found") {
        setError("You're not registered");
        return;
      }

      // handle other errors
      if (res.error) {
        setError("Something went wrong, please try again");
        return;
      }
      return;
    }
  };

  console.log('isLogging', isLogging)
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold">
          Welcome to TODO App
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              {title}
            </h1>
            {error && <div className="text-red-600">{error}</div>}
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleFormSubmission}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Your email
                </label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange(e, "email")}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={(e) => handleChange(e, "password")}
                />
              </div>
              <Button
                type="submit"
                label={type === "register" ? "Sign Up" : "Sign In"}
              // disabled={isLogging}
              />
              {type === "register" && (
                <p className="text-sm font-light">
                  Don’t have an account yet?{" "}
                  <Link
                    href="/"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </Link>
                </p>
              )}
              {type === "login" && (
                <p className="text-sm font-light">
                  Already have an account?{" "}
                  <Link
                    href="register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
