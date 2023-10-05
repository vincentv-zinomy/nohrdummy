import { Bars3Icon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { DragEvent, useState } from "react";

interface NavigationItemI {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  sub_menus?:{id:any, name:string, label:string}[] // The icon is a React component
  color:string
}

type Props = {
  item: NavigationItemI;
};

const DragMenuItems = ({ item }: Props) => {
  const [open, setOpen] = useState(false);
  const onDragStart = (event:DragEvent<HTMLDivElement>, nodeType:string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div>

        <button
        key={item.name}
        className={
            "w-full flex items-center justify-between px-2 py-2 text-sm border-b border-slate-300   "
        }

        onClick={() => setOpen(!open)}
        >
        <div className="flex items-center text-xs">
            <item.icon
            className={"mr-3 flex-shrink-0 h-6 w-6"}
            aria-hidden="true"
            />
            {item.name}
        </div>
        <ChevronRightIcon
            className={`h-4 w-4 text-gray-500 ${open ? "rotate-90" : "rotate-0"}`}
        />
        </button>
        <div className={` h-fit     w-full `}>
          {open && 
            <div className="p-2 space-y-2 bg-slate-50">

                 
                
                 {item.sub_menus && item.sub_menus.map((x:any)=>{
                    return(
                        <div className="  flex h-8 overflow-hidden" 
                    onDragStart={(event) => onDragStart(event, x.name)} 
                    draggable 
                    key={`sub_menu_keys${x.id}`}
                >
                    <div className="w-2 rounded-l-md  shrink-0 h-8" style={{border:`1px solid ${item.color}`,background:item.color}}>
 
                    </div>
                    <div className="w-full flex items-center px-2 border-y border-r border-dashed  rounded-r-md border-slate-600 text-slate-600 text-xs justify-between">
                        <span>
                            {x.label}
                        </span>
                        <Bars3Icon className="h-4 w-4 text-gray-500" />

                    </div>
                </div>
                    )
                 })}

                 
            </div>
          }
        </div>
    </div>
  );
};

export default DragMenuItems;
