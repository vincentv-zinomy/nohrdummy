import { PlusIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { Handle, NodeProps, Position, addEdge, useReactFlow } from 'reactflow'
import { handleStyle } from '../NodeTypes'

type Props = {}

const ChildNode = (props: NodeProps) => {

    const [show, setShow] = useState(true)
    const {getNode, addNodes, addEdges, getEdges} = useReactFlow()

    console.log(getEdges())
    const handleClick = () => {
        setShow(false)
        const parent_id = getNode(props.id)?.parentNode
        const id = String(Math.floor(Math.random()*100**2))
        addEdges(

            {
                id: `${id}_${parent_id}`,
                source:props.id,
                target:id,
                sourceHandle:'a',
                targetHandle:'b',
                zIndex:2000
                // deletable:false
              }
        )

        addNodes(

            {
              id,
              data: { label: 'Node B.1' },
              position: { x: 12   , y: 12     },
              parentNode: parent_id,
              extent: 'parent',
              type:'childNode',
              draggable:true,
              zIndex:2000
            }
          )
    }

  return (
    <div className='w-fit  flex flex-col gap-1 items-center'>
        <Handle
        type="target"
        position={Position.Top}
        className="w-2.5 h-2.5     border-2 z-10 bg-white border-red-500"
        id="b"
        style={handleStyle}
      />
      
        <div className={` border ${
            props.selected && "border-slate-500"
            }    rounded-md bg-white w-20 h-20`}>
            
        </div>
        {
            show 
            ?
            
                <div className='flex flex-col gap-1 items-center justify-center'>
                <div className='w-[1px] h-6 bg-black'>

                </div>
                    <button className='hover:bg-red-100 bg-red-200  h-fit flex flex-col' onClick={handleClick}>
                        <PlusIcon className='w-5 h-5'/>
                    </button>
                </div> 
            :
            <Handle
            type="source"
            position={Position.Bottom}
            className="w-2.5 h-2.5     border-2 z-10 bg-white border-red-500"
            id="a"
            style={handleStyle}
          />
        }
    </div>
  )
}

export default ChildNode