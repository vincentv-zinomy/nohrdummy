import { NodeProps } from "reactflow";
import AgentNode from "./CustomNodes/AgentNode";
import CustomNode from "./CustomNodes/CustomNode";
import CustomNode1 from "./CustomNodes/CustomNode1";
import CustomNode2 from "./CustomNodes/CustomNode2";
import UseCaseNode from "./CustomNodes/UseCaseNode";


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

 

const agentsInputs:InputType[] = [
  {
    name:'name',
    type:'text',
    value:'',
    label:'Agent Name',
  },
  {
    name:'agent_type',
    type:'select',
    selected:{
      id:'agent_type_id_0',
      label:'LLM',
      value:'llm'
    },
    value:'LLM',
    label:'Agent Type',
    options:[
      {
        id:'agent_type_id_0',
        label:'LLM',
        value:'llm'
      },
      {
        id:'agent_type_id_1',
        label:'Function',
        value:'function'
      },
      
    ]
  },
  {
    name:'description',
    type:'textarea',
    value:'',
    label:'Description',
  },
  {
    name:'provider',
    type:'select',
    selected:{
      id:'provider_id_0',
      label:'Open AI',
      value:'open_ai'
    },
    value:'open_ai',
    label:'Provider',
    options:[
      {
        id:'provider_id_0',
        label:'Open AI',
        value:'open_ai'
      },
      
      
    ]
  },
  {
    name:'model',
    type:'select',
    selected:{
      id:'model_id_0',
      label:'GPT 4',
      value:'gpt-4'
    },
    value:'gpt-4',
    label:'Model',
    options:[
      {
        id:'model_id_0',
        label:'GPT 4',
        value:'gpt-4'
      },
      {
        id:'model_id_1',
        label:'GPT 3.5 (turbo)',
        value:'gpt_3.5'
      },
      
    ]
  },
  {
    name:'temprature',
    type:'number',
    value:0.3,
    label:'Temprature',
    min:0,
    max:1
  },
  {
    name:'max_tokens',
    type:'number',
    value:200,
    min:0,
    max:4096,
    label:'Max Tokens'
  },
  {
    name:'top_p',
    type:'number',
    value:1,
    min:0,
    max:1,
    label:'Top P'
  },
  {
    name:'prompt',
    type:'textarea',
    value:'',
    label:'Prompt',
  },
  {
    name:'requirements',
    type:'textarea',
    value:'',
    label:'Requirements',
  },
  {
    name:'parameters',
    type:'textarea',
    value:'',
    label:'Parameters (JSON)',
  },
]

export const defineNodesTypes = {
    customNode: CustomNode,
    customNode1: CustomNode1,
    customNode2: CustomNode2,
    usecase:UseCaseNode,
    agents: (props:NodeProps)=><AgentNode {...props} inputs={agentsInputs} />
  }


  
 
  