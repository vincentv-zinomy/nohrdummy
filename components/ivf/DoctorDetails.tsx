import { AppointmentDataType } from '@/pages/ivf/novo'
import React, { useState } from 'react'

type Props = {
    data: AppointmentDataType
}

const DoctorDetails = ({ data }: Props) => {

    const [openContent, setContent] = useState(false)

    return (
        <div className='w-full'>

            <div className="bg-sky-100  p-6 pt-16  flex flex-row flex-row-reverse	 justify-between  gap-10 bg-white w-full h-fit ">
                <div className="h-28  shrink-0  mx-auto rounded-full overflow-hidden border border-black">
                    <img src={data.logo_image} alt="" className="w-full h-full " />
                </div>
                <div className=' w-full'>
                    <div className='absolute top-2 left-0 w-[100px] p-2 bg-blue-800 text-sm text-white rounded-r-md font-semibold '>
                        {data.name}
                    </div>
                    <h1 className="text-lg  font-semibold mb-2">{data.name}</h1>
                    <div className="mb-2">
                        <p className="text-xs  mb-2 ">{data.description}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DoctorDetails