import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

type Props = {};

const CategoriesButton = ({data}: any) => {
    const [open, setOpen] = useState<boolean>(false)
  return (
    <>
        <button key={data.id} className="flex items-center gap-3 w-64 border-2 border-transparent focus:border-brand-blue-200 rounded-sm px-2 py-1.5 font-semibold" onClick={()=>setOpen(!open)}>
        <span>
            <ChevronDownIcon className={`w-4 h-4 text-slate-500 ${open && 'rotate-180'}`} />
        </span>
        <span>{data.name}</span>
        </button>
        {open && 
            <div className=" space-y-2 mt-2 ">
                {data.submenus.map((x:any)=>{
                    return (
                        <button key={x.key} className="pl-10 text-base block cursor-pointer font-medium text-slate-600 hover:text-slate-900">
                            {x.name}
                        </button>
                    )
                })}
            </div>
        }
    </>
  );
};

export default CategoriesButton;
