import React, { ReactNode } from "react";

type Props = {
  children:ReactNode,
  handleClick:any
};

const ButtonComp = ({
  children,
  handleClick
}: Props) => {
  return (
    <div className=" bg-slate-50 py-2 px-6 gap-2 flex justify-end relative">
        
        <button
          className="block  w-fit px-4 py-2 mt-2 rounded-md font-medium text-white shadow-sm   bg-slate-600 hover:bg-slate-700 active:bg-slate-800 focus:ring-gray-500 sm:text-sm"
          onClick={handleClick} 
        >{children}</button> 
    </div>
  );
};

export default ButtonComp;
