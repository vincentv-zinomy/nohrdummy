import {
  AdjustmentsHorizontalIcon,
  ArrowUpIcon,
  ChatBubbleLeftIcon,
  ChevronUpIcon,
  EnvelopeIcon,
  PhoneIcon,
  PlusCircleIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRef, useContext, useEffect, useState } from "react";
import { Edge, Handle, Node, NodeToolbar, Position, useReactFlow } from "reactflow";
import CustomSelelct from "../../CustomSelelct";
import { handleStyle } from "../../NodeTypes";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
import TextInputComp from "../../InputComponents/TextInputComp";
import TextAreaInputComp from "../../InputComponents/TextAreaInputComp";
import EditModal from "../../EditModal";

const communicationchannel = [
  {
    key: "whatsapp",
    name: "Whatsapp Chat",
    logo: BsWhatsapp,
    show: false,
  },
  {
    key: "email",
    name: "Email",
    logo: EnvelopeIcon,
    show: false,
  },
  {
    key: "sms",
    name: "SMS",
    logo: ChatBubbleLeftIcon,
    show: false,
  },
  {
    key: "facebook",
    name: "Facebook",
    logo: BsFacebook,
    show: false,
  },
  {
    key: "voice",
    name: "Voice",
    logo: PhoneIcon,
    show: false,
  },
  {
    key: "instagram",
    name: "Instagram",
    logo: BsInstagram,
    show: false,
  }
];

const channels: any = {
  whatsapp: {
    id: 'commwhatsapp',
    nodename: 'whatappCommNode',
    source: 'whatsapp-source',
    target: 'whatsapp-target'
  },
  email: {
    id: 'commemail',
    nodename: 'emailCommNode',
    source: 'email-source',
    target: 'email-target'
  },
  sms: {
    id: 'commsms',
    nodename: 'smsCommNode',
    source: 'sms-source',
    target: 'sms-target'
  },
  facebook: {
    id: 'commfacebook',
    nodename: 'facebookCommNode',
    source: 'facebook-source',
    target: 'facebook-target'
  },
  voice: {
    id: 'commvoice',
    nodename: 'voiceCommNode',
    source: 'voice-source',
    target: 'voice-target'
  },
  instagram: {
    id: 'comminstagram',
    nodename: 'instagramCommNode',
    source: 'instagram-source',
    target: 'instagram-target'
  }
}



export default function UseCaseNode(props: any) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [commChannel, setCommChannel] = useState(communicationchannel);
  const [openQualRequirements, setOpenQualRequirements] = useState(true)

  // console.log(commChannel, "commchannel");
  const { setNodes, getNodes, addNodes, addEdges, deleteElements, getNode, getEdges, setEdges, getEdge } = useReactFlow();
  const divRef = useRef<HTMLDivElement>(null);

  const [nodeData, setNodeData] = useState({
    name: "" || props.data?.values?.name,
    organization: "" || props.data?.values?.organization,
    qualification_requirement_check:
      "" || props.data?.values?.qualification_requirement_check,
    default_followup_message:
      "" || props.data?.values?.default_followup_message,
    default_not_interested_message:
      "" || props.data?.values?.default_not_interested_message,
    default_not_qualified_message:
      "" || props.data?.values?.default_not_qualified_message,
  });
  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          node.data.values = nodeData;
        }
        return node;
      })
    );
  }, [nodeData]);

  // console.log(props,'props')

  useEffect(() => {



    const addNewNode = (type: string) => {
      const id = `${Math.random() * 10 ** 6}`;
      const newNode = {
        id: type,
        position: {
          x: props.xPos - 500,
          y: props.yPos + Math.floor(Math.random() * 1000),
        },
        data: {
          label: `Node ${id}`,
        },
        type: type,
        deletable: false
      };
      addNodes(newNode)

    }

    commChannel.forEach((x) => {

      if (x.show) {
        addNewNode(channels[x.key].nodename)

        if (!getEdge(channels[x.key].id)) {
          setEdges((eds) => eds.concat({
            id: `${channels[x.key].id}`,
            source: channels[x.key].nodename,
            target: props.id,
            sourceHandle: channels[x.key].source,
            targetHandle: channels[x.key].target,
            deletable: false
          }))
        }

      } else {

        if (getNode(channels[x.key].nodename)) {
          setNodes((nodes) => nodes.filter((node) => node.id !== channels[x.key].nodename))
          deleteElements({
            // nodes:[{id:channels[x.key].nodename}],

            edges: [{ id: `${channels[x.key].id}` }]
          })
        }
      }
    })


    // addNodes
  }, [commChannel]);

  const handleChange = (e: any) => {
    setNodeData({ ...nodeData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <NodeToolbar
        isVisible={props.data.toolbarVisible}
        position={props.data.toolbarPosition}
        className="border bg-white divide-x text-gray-800  rounded-md flex items-center   justify-center drop-shadow-sm"
      >
        {/* <button
          onClick={() => deleteNodes()}
          className="p-1.5 flex items-center justify-center"
        >
          <TrashIcon className="w-5 h-5  " />
        </button>
        <button onClick={() => addNodesHandler()} className="p-1.5">
          <DocumentDuplicateIcon className="h-5 w-5 " />
        </button> */}
        <button
          className="p-1.5"
          onClick={() => setOpenEditModal(!openEditModal)}
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5  " />
        </button>
      </NodeToolbar>

      <Handle
        type="source"
        position={Position.Right}
        className="w-2.5 h-2.5     border-2 z-10 bg-white border-red-500"
        id="use_case_main_pointer"
        style={handleStyle}
      />
      <div
        className={` border ${props.selected && "border-slate-500"
          }    rounded-md bg-white`}
        ref={divRef}
      >
        <div
          className={` node w-96 bg-slate-50 border-b p-5 rounded-t-md flex items-center gap-2`}
        >
          <TrashIcon className="w-7 h-7" /> Use Case
        </div>
        <div className="p-5 text-sm text-slate-400">Create Use Case</div>

        <div className="space-y-1 pb-6 relative">
          
          <div className=" bg-slate-50 py-2 px-6 flex items-center gap-2 relative">
              <Handle
                type="source"
                position={Position.Right}
                className="w-2.5 h-2.5  absolute -right-[10px] border-2 bg-white border-red-500"
                id="usecase-agent"
                style={handleStyle}
              />
              <p>
                Agent <span className="text-red-500 ">*</span>
              </p>
            </div>

          

            <div className=" bg-slate-50 py-2 px-6 flex items-center gap-2 relative">
              <Handle
                type="source"
                position={Position.Right}
                className="w-2.5 h-2.5  absolute -right-[10px] border-2 bg-white border-red-500"
                id="usecase-store"
                style={handleStyle}
              />
              <p>
                Data Store <span className="text-red-500 ">*</span>
              </p>
            </div>
            <TextInputComp
            name={"name"}
            value={nodeData.name}
            label={"Use Case Name"}
            handleChange={handleChange}
          />
          {/* <CustomSelelct
            state={nodeData}
            setState={setNodeData}
            name="organization"
            label="Organization"
            list={[
              {
                id: 1,
                value: "zigment_staging",
                label: "Zigment Staging",
              },
              {
                id: 2,
                value: "Lazy Aardvark Organization",
                label: "Lazy Aardvark Organization",
              },
            ]}
          /> */}
          <div className="  my-1">
            <div className="px-6   font-semibold py-2 bg-slate-100 flex items-center justify-between" onClick={()=>setOpenQualRequirements(!openQualRequirements)}>
              <span>Qualifications/Messages</span> 
              <button className="p-1 shrink-0  ">
                 <ChevronUpIcon className={`text-slate-900 w-5 h-5 stroke-2 shrink-0 ${!openQualRequirements && 'rotate-180'}`}/> 
              </button>
            </div>
            {openQualRequirements &&
              <div className="space-y-1">

                  <TextAreaInputComp
                    label="Qualification Requirement Check"
                    value={nodeData.qualification_requirement_check}
                    handleChange={handleChange}
                    name={"qualification_requirement_check"}
                  />
                <TextAreaInputComp
                  label="Default Followup Message"
                  value={nodeData.default_followup_message}
                  handleChange={handleChange}
                  name={"default_followup_message"}
                />
                <TextAreaInputComp
                  label="Default Not Interested Message"
                  value={nodeData.default_not_interested_message}
                  handleChange={handleChange}
                  name={"default_not_interested_message"}
                />

                <TextAreaInputComp
                  label="Default Not Qualified Message"
                  value={nodeData.default_not_qualified_message}
                  handleChange={handleChange}
                  name={"default_not_qualified_message"}
                />
              </div>
            }
          </div>

          <div className=" bg-slate-50 py-2  gap-2 relative">
            <label
              htmlFor="name"
              className="block font-medium px-6  text-black text-left"
            >
              Communication Channels
            </label>

            {commChannel.map((comm) => {
              return (
                <div
                  className="mt-2 space-y-2 flex item-center gap-2"
                  key={`comm_key_${comm.name}`}
                >
                  <div className="relative w-full">
                    {
                      // comm.show &&
                      <Handle
                        type="target"
                        position={Position.Left}
                        className="w-2.5 h-2.5 absolute     border-2 z-10 bg-white border-red-500"
                        id={`${comm.key}-target`}
                        style={{ ...handleStyle, left: "-5px" }}
                      />
                    }
                    <div className="px-6 gap-4  w-full bg-slate-200 py-2 text-slate-800 flex items-center  ">
                      <input
                        id="comments"
                        aria-describedby="comments-description"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 cursor-pointer rounded border-gray-300 text-red-600 focus:ring-red-500"
                        onChange={(e) => {
                          setCommChannel((prev) => {
                            const newcomm = prev.map((x) => {
                              if (x.key === comm.key) {
                                x.show = e.target.checked;
                              }
                              return x;
                            });
                            return newcomm;
                          });
                        }}
                        checked={comm.show}
                      />
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5">
                          <comm.logo className="w-full h-full" />
                        </div>
                        <p onClick={() => {

                          console.log('clicked')
                        }}>{comm.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <EditModal open={openEditModal} setOpen={setOpenEditModal} />

    </>
  );
}
