import React from "react";
import classnames from "classnames";

const Input: React.FC<{
  type: "text" | "email" | "password" | "checkbox";
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({
  type,
  name,
  id,
  placeholder,
  className,
  required,
  value,
  onChange,
}) => (
  <input
    type={type}
    name={name}
    id={id}
    placeholder={placeholder}
    className={classnames(
      "sm:text-sm rounded-lg block w-full p-2.5 focus:text-black",
      className
    )}
    required={required}
    value={value}
    onChange={onChange}
  />
);

export default Input;
