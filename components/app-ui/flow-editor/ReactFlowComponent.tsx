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

export const navigation = [
  {
    id:1,
    name: "Use Case",
    icon: TrashIcon,
    color:'rgb(144, 59, 190)',
    sub_menus: [
      {
        id: 1,
        name: "usecase",
        label: "Use Case",
      } 
    ],
  },
  {
    id:2,
    name: "Agents",
    icon: RocketLaunchIcon,
    color:'rgb(254, 117, 0)',
    sub_menus: [
      {
        id: 2,
        name: "agents",
        label: "Conversation Agent",
      },
      {
        id: 3,
        name: "agents",
        label: "Payment Agent",
      },
      {
        id: 4,
        name: "agents",
        label: "Scheduling Agent",
      },
      {
        id: 5,
        name: "agents",
        label: "Cancellation Agent",
      },
      {
        id: 6,
        name: "agents",
        label: "Refund Agent",
      },
      {
        id: 7,
        name: "agents",
        label: "Re-Scheduling Agent",
      },
      {
        id: 7,
        name: "agents",
        label: "Call Connect Agent",
      },
    ],
  },

  {
    id:3,
    name: "Peer Agents",
    icon: LinkIcon,
    color:'rgb(122, 174, 66)',
    sub_menus: [
      {
        id: 8,
        name: "customNode2",
        label: "Qualification Agent",
      },
      {
        id: 9,
        name: "customNode2",
        label: "Follow Up Agent",
      },
    ],
  },
  {
    id:4,
    name: "Data Store",
    icon: CircleStackIcon,
    color:'rgb(66, 186, 167)',
    sub_menus: [
      {
        id: 10,
        name: "customNode2",
        label: "Google Drive",
      },
      {
        id: 11,
        name: "customNode2",
        label: "File(s): PDF, Excel, etc",
      },
      {
        id: 13,
        name: "customNode2",
        label: "URL",
      },

      {
        id: 14,
        name: "customNode2",
        label: "DropBox",
      },
    ],
  },
  {
    id:5,
    name: "Communication Channels",
    color:'rgb(99, 68, 190)',
    icon: PhoneIcon,
    sub_menus: [
      {
        id: 15,
        name: "commChannelNode",
        label: "SMS",
      },
      {
        id: 16,
        name: "commChannelNode",
        label: "WhatsApp",
      },
      {
        id: 17,
        name: "commChannelNode",
        label: "Email",
      },
      {
        id: 18,
        name: "commChannelNode",
        label: "Facebook Messenger",
      },
      {
        id: 19,
        name: "commChannelNode",
        label: "Voice",
      },
    ],
  }, 
];

interface CustomValues {
  openTextModal: boolean;
  setOpenTextModal: React.Dispatch<React.SetStateAction<boolean>>;
  openEditModal: boolean;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  textModalData: any;
  setTextModalData: React.Dispatch<React.SetStateAction<any>>;
}

export const CustomValuesContext = createContext<CustomValues>({
  openTextModal: false,
  setOpenTextModal: () => {},
  openEditModal: false,
  setOpenEditModal: () => {},
  textModalData: "",
  setTextModalData: () => {},
});

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
        <CustomValuesContext.Provider
          value={{
            openTextModal,
            setOpenTextModal,
            openEditModal,
            setOpenEditModal,
            textModalData,
            setTextModalData,
          }}
        >
          <div className="w-full flex items-center h-full ">
            {/* Static sidebar for desktop */}
            <Sidebar />

            <MainFLow />
          </div>

          <EditModal open={openEditModal} setOpen={setOpenEditModal} />
        </CustomValuesContext.Provider>
      </ReactFlowProvider>
    </>
  );
}
