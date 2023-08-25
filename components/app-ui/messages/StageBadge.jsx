export default function StageBadge({stage}) {
    
    return (
      <>
        {stage==='NEW' && 
            <span className="inline-flex items-center rounded-full bg-indigo-200 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                New
            </span>
        }
        {
            stage==='STAGE_1' &&
            <span className="inline-flex items-center rounded-full bg-yellow-200 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
            Stage 1
            </span>
        }
        {/* <span className="inline-flex items-center rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          Badge
        </span>
        <span className="inline-flex items-center rounded-full bg-red-200 px-2.5 py-0.5 text-xs font-medium text-red-800">
          Badge
        </span>
        
        <span className="inline-flex items-center rounded-full bg-green-200 px-2.5 py-0.5 text-xs font-medium text-green-800">
          Badge
        </span>
        <span className="inline-flex items-center rounded-full bg-blue-200 px-2.5 py-0.5 text-xs font-medium text-blue-800">
          Badge
        </span>
        
        <span className="inline-flex items-center rounded-full bg-purple-200 px-2.5 py-0.5 text-xs font-medium text-purple-800">
          Badge
        </span>
        <span className="inline-flex items-center rounded-full bg-pink-200 px-2.5 py-0.5 text-xs font-medium text-pink-800">
          Badge
        </span> */}
      </>
    )
  }
  