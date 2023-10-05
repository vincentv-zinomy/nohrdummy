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
    name: "Use Case",
    icon: TrashIcon,
    color:'rgb(144, 59, 190)',
    sub_menus: [
      {
        id: 1,
        name: "usecase",
        label: "Use Case",
      },
    ],
  },
  {
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
    name: "Peer Agents",
    icon: LinkIcon,
    color:'rgb(122, 174, 66)',
    sub_menus: [
      {
        id: `peer_agents_key_2`,
        name: "customNode2",
        label: "Qualification Agent",
      },
      {
        id: `peer_agents_key_3`,
        name: "customNode2",
        label: "Follow Up Agent",
      },
    ],
  },
  {
    name: "Data Store",
    icon: CircleStackIcon,
    color:'rgb(66, 186, 167)',
    sub_menus: [
      {
        id: `data_stroe_key_2`,
        name: "customNode2",
        label: "Google Drive",
      },
      {
        id: `data_stroe_key_3`,
        name: "customNode2",
        label: "File(s): PDF, Excel, etc",
      },
      {
        id: `data_stroe_key_4`,
        name: "customNode2",
        label: "URL",
      },

      {
        id: `data_stroe_key_5`,
        name: "customNode2",
        label: "DropBox",
      },
    ],
  },
  {
    name: "Communication Channels",
    color:'rgb(99, 68, 190)',
    icon: PhoneIcon,
    sub_menus: [
      {
        id: `communication_channels_2`,
        name: "customNode2",
        label: "SMS",
      },
      {
        id: `communication_channels_3`,
        name: "customNode2",
        label: "WhatsApp",
      },
      {
        id: `communication_channels_4`,
        name: "customNode2",
        label: "Email",
      },
      {
        id: `communication_channels_5`,
        name: "customNode2",
        label: "Facebook Messenger",
      },
      {
        id: `communication_channels_5`,
        name: "customNode2",
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
