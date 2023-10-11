import React, { MouseEvent, useCallback, useState } from 'react';
import { BaseEdge, Edge, EdgeLabelRenderer, EdgeProps, Node, getBezierPath, useReactFlow } from 'reactflow';
import {MdCallSplit } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'
  
const onEdgeClick = (evt:MouseEvent, id:string) => {
  evt.stopPropagation();
  // alert(`remove ${id}`);
};

export default function ButtonEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {border:'1px solid red',background:'red'},
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [isSplitButtonVisible, setIsSplitButtonVisible] = useState<boolean>(false);
  const {getEdges, getEdge, getNodes, getNode, addEdges, addNodes, setNodes} = useReactFlow()

  const handleClick = useCallback( (evt:MouseEvent, id:string) => {
    const {source, target}:Edge | any = getEdge(id)
    const newId = uuidv4()

    if(getNode(source) && getNode(target)){
      // console.log(source, 'source')
      const sourceNode = getNode(source)
      const targetNode:any = getNode(target)
      const parentNode:any = getNode(targetNode.parentNode)
      // console.log(props.xPos - (parentNode?.position.x as number) , 'parent_node')

      const xPos = targetNode.position.x + 400
      const yPos = targetNode.position.y 
      
      console.log(getNodes().map((node)=>node.data.level===targetNode.data.level).length)
      

      addEdges(
          {
              id: `${newId}_${parentNode.id}`,
              source,
              target:newId,
              sourceHandle:'a',
              targetHandle:'b',
              zIndex:2000,
              type:'buttonedge'
              // deletable:false
            }
      )

      addNodes(
          {
            id:newId,
            data: { 
              label: 'Node B.1',
              level:targetNode?.data.level , 
              parentNode:sourceNode?.id, 
              column:targetNode?.data.column + 1 
            },
            position: { x: xPos   , y: yPos     },
            parentNode: parentNode.id ,
            extent: 'parent',
            type:'childNode',
            draggable:true,
            zIndex:2000
          }
        )
    }

  },[])

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: 'all',
          }}
          className="nodrag nopan flex  text-slate-500 z-[2100]"
        >
          <button className="w-5 h-5 bg-slate-200 border cursor-pointer rounded-full text-sm hover:drop-shadow-sm hover:ring-1 rotate-180 hover:ring-slate-400 block flex items-center justify-center" onClick={(event) => handleClick(event, id)}
           onMouseEnter={() => setIsSplitButtonVisible(true)} // Show the button on hover
           onMouseLeave={() => setIsSplitButtonVisible(false)} // Hide the button when the mouse leaves
         
          >
            <MdCallSplit/>
          </button>
          <button className={`absolute inset-y-0 -right-12 text-[10px] border rounded-full px-2 flex items-center bg-white drop-shadow-sm font-mono ${
              isSplitButtonVisible ? 'opacity-100' : 'opacity-0'
            }`}>
            Split
          </button>
        </div>
         
      </EdgeLabelRenderer>
    </>
  );
}
