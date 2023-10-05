import ReactFlowComponent from '@/components/app-ui/flow-editor/ReactFlowComponent'
import React from 'react'

function FlowEditor() {
    return (
        <div className='' style={{height:'calc(100vh - 64px)'}}>
            <ReactFlowComponent />
        </div>
    )
}

export default FlowEditor