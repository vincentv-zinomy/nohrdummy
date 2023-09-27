import Flow from '@/components/app-ui/workflow-builder/Flow'
import React from 'react'

import 'reactflow/dist/style.css';

function AgentFlow() {
    return (
        <div className='h-screen'>
            <Flow />
        </div>
    )
}

export default AgentFlow