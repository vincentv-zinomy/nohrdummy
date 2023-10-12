import { NodeProps } from "reactflow";
import AgentNode from "./CustomNodes/Agents/AgentNode";
import ConversatoinAgentNode from "./CustomNodes/Agents/ConversationAgent";
import PaymentAgentNode from "./CustomNodes/Agents/PaymentAgent";

import UseCaseNode from "./CustomNodes/UseCase/UseCaseNode";
import CommChannelNode from "./CustomNodes/CommunicationChannel/CommChannelNode";
import CRMNode from "./CustomNodes/DataStore/CRM";
import { CircleStackIcon, LinkIcon, PhoneIcon, RocketLaunchIcon, TrashIcon } from "@heroicons/react/24/outline";
import WhatappCommNode from "./CustomNodes/CommunicationChannel/WhatappCommNode";
import EmailCommNode from "./CustomNodes/CommunicationChannel/EmailCommNode";
import VoiceCommNode from "./CustomNodes/CommunicationChannel/VoiceCommNode";
import SMSCommNode from "./CustomNodes/CommunicationChannel/SMSCommChannel";
import FacebookCommNode from "./CustomNodes/CommunicationChannel/FacebookCommNode";
import InstagramCommNode from "./CustomNodes/CommunicationChannel/InstagramCommNode";
import TestNode from "./CustomNodes/TestNode";
import ChildNode from "./CustomNodes/ChildNode";

export const handleStyle = { width: '10px', height: '10px', border: '1px solid red', background: 'white' }

export const defineNodesTypes = {
  usecase: UseCaseNode,
  agents: AgentNode,
  conversation_agent: ConversatoinAgentNode,
  payment_agent: PaymentAgentNode,
  commChannelNode: CommChannelNode,

  // Data Store
  crm_node: CRMNode,

  // Subflow
  customNode: TestNode,
  childNode: ChildNode,

  // Communication Channel
  whatappCommNode: WhatappCommNode,
  emailCommNode: EmailCommNode,
  voiceCommNode: VoiceCommNode,
  smsCommNode: SMSCommNode,
  facebookCommNode: FacebookCommNode,
  instagramCommNode: InstagramCommNode,

   
}

export const navigation = [
  {
    id: 1,
    name: "Use Case",
    icon: TrashIcon,
    color: 'rgb(144, 59, 190)',
    sub_menus: [
      {
        id: 1,
        name: "usecase",
        label: "Use Case",
      }
    ],
  },
  {
    id: 2,
    name: "Agents",
    icon: RocketLaunchIcon,
    color: 'rgb(254, 117, 0)',
    sub_menus: [
      {
        id: 2,
        name: "conversation_agent",
        label: "Conversation Agent",
      },
      {
        id: 3,
        name: "payment_agent",
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
        id: 8,
        name: "agents",
        label: "Call Connect Agent",
      },
    ],
  },

  {
    id: 3,
    name: "Peer Agents",
    icon: LinkIcon,
    color: 'rgb(122, 174, 66)',
    sub_menus: [
      {
        id: 8,
        name: "customNode",
        label: "Qualification Agent",
      },
      {
        id: 9,
        name: "customNode",
        label: "Follow Up Agent",
      },
    ],
  },
  {
    id: 4,
    name: "Data Store",
    icon: CircleStackIcon,
    color: 'rgb(66, 186, 167)',
    sub_menus: [
      {
        id: 121,
        name: "crm_node",
        label: "CRM",
      },
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
    id: 5,
    name: "Communication Channels",
    color: 'rgb(99, 68, 190)',
    icon: PhoneIcon,
    sub_menus: [
      {
        id: 15,
        name: "commChannelNode",
        label: "SMS",
      },
      {
        id: 16,
        name: "whatappCommNode",
        label: "WhatsApp",
      },
      {
        id: 17,
        name: "emailCommNode",
        label: "Email",
      },
      {
        id: 18,
        name: "facebookCommNode",
        label: "Facebook Messenger",
      },
      {
        id: 19,
        name: "voiceCommNode",
        label: "Voice",
      },
      {
        id: 20,
        name: "instagramCommNode",
        label: "Instagram",
      },
    ],
  },
];


export type modalStateDataI = {
  id: number;
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'password';
}

export function convertArrayToObject(inputArray: modalStateDataI[]) {
  const resultObject: any = {};

  for (const item of inputArray) {
    resultObject[item.name] = ``;
  }

  return resultObject;
}


export type TextType = {
  name: string;
  type: 'text';
  value: string;
  label: string;
};

export type SelectType = {
  name: string;
  type: 'select';
  value: string | null;
  label: string;
  selected: any
  options: {
    id: string;
    label: string;
    value: string | null;
  }[];
};

export type TextareaType = {
  name: string;
  type: 'textarea';
  value: string;
  label: string;
};

export type NumberInputType = {
  name: string;
  type: 'number';
  value: number;
  label: string;
  min: number,
  max: number
}

export type InputType = TextType | SelectType | TextareaType | NumberInputType;

