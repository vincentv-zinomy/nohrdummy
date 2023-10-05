import { NodeProps } from "reactflow";
import AgentNode from "./CustomNodes/AgentNode";
import CustomNode from "./CustomNodes/CustomNode";
import CustomNode1 from "./CustomNodes/CustomNode1";
import CustomNode2 from "./CustomNodes/CustomNode2";
import UseCaseNode from "./CustomNodes/UseCaseNode";
import CommChannelNode from "./CustomNodes/CommChannelNode";

export const handleStyle = {width:'10px', height:'10px', border:'1px solid red',background:'white'}

export const defineNodesTypes = {
    customNode: CustomNode,
    customNode1: CustomNode1,
    customNode2: CustomNode2,
    usecase:UseCaseNode,
    agents:AgentNode,
    commChannelNode:CommChannelNode,
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
    selected:any
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

 