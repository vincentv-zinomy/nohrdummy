import { ChangeEvent, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
 

export default function CustomNode({ data }:any) {
  const onChange = useCallback((evt:ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  
  console.log(data)

  return (
    <div>
    
      <Handle type="target" position={Position.Left} style={{top:10, width:'10px', height:'10px', border:'1px solid red', backgroundColor:'white' }} id='a'/>
      <Handle type="target" position={Position.Left} id='b'/>
      
      <div className='border border-black p-2 rounded-sm flex gap-2 items-center'>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag py-1 px-2 rounded-sm border border-gray-600 outline-none" />
        
      </div>
      <Handle type="source" position={Position.Right} id="a" /> 
    </div>
  );
}