import {
  CircleStackIcon, 
  LinkIcon, 
  PhoneIcon,
  RocketLaunchIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import React, { useState, createContext } from "react";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./Sidebar";
import EditModal from "./EditModal";
import MainFLow from "./MainFLow";



 
 

export default function ReactFlowComponent() {
  const [openTextModal, setOpenTextModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [textModalData, setTextModalData] = useState<any>({
    name: "",
    value: "",
    handleChange: null,
  });

  return (
    <>
      <ReactFlowProvider>
        
          <div className="w-full flex items-center h-full ">
            {/* Static sidebar for desktop */}
            <Sidebar />

            <MainFLow />
          </div>

          <EditModal open={openEditModal} setOpen={setOpenEditModal} />
      </ReactFlowProvider>
    </>
  );
}
