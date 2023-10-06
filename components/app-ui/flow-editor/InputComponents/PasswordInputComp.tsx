import React, { useState } from "react";

type Props = {
  handleChange: (e: any) => void;
  value: string | number;
  label: string;
  name: string;
};

const PasswordInputComp = ({ handleChange, value, label, name }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className=" bg-slate-50 py-2 px-6 gap-2 relative">
      <label htmlFor={name} className="block text-black text-left">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className="block w-full px-2 py-1.5 mt-2 rounded-md border border-grey-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
          name={name}
          value={value}
          onChange={handleChange}
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1"
          onClick={toggleShowPassword}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
};

export default PasswordInputComp;
