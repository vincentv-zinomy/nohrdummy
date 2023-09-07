

import React, { useEffect, useRef, useState } from 'react';
import { FaHouseMedical } from 'react-icons/fa6';
import TailwindNav2 from './TailwindNav2';
import {  AppointmentDataType } from '@/pages/ivf/novo';


type Props = {
  data: AppointmentDataType;
};



const AppointmentComponent = ({ data }: Props) => {
  const componentRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleScroll = () => {
      if (componentRef.current) {
        const componentTopOffset = componentRef.current.getBoundingClientRect().top;
        const isSticky = componentTopOffset <= 0;

        componentRef.current.style.position = isSticky ? 'sticky' : 'relative';
        componentRef.current.style.top = isSticky ? '0' : 'initial';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full   shrink-0   overflow-hidden drop-shadow-lg">
      <div ref={componentRef} className=''>
        <h2 className="text-2xl font-semibold hidden ">Pick a time slot</h2>
        <div className="rounded-t-md rounded-lg overflow-hidden mt-4 w-11/12 mx-auto">
          <div className="flex font-semibold rounded-t-md items-center justify-between bg-sky-100 text-sm  p-4 text-black">
            <div className="flex items-center gap-4">
              <span className="p-2 bg-blue-500 rounded-full text-white">
                <FaHouseMedical />
              </span>

              Clinic Appointment
            </div>
            <span>{data.clinic.fee}</span>
          </div>
          <div className="h-fit w-full bg-white ">
            <div className="flex justify-between relative p-3 ">
              <div>
                <p>{data.clinic.hospital_name}</p>
                <p className='text-sm'>{data.clinic.address.area}</p>
                <p className='hidden '>
                  {data.clinic.rating} ★  {data.clinic.fee}
                </p>
                <p className='text-xs  mt-1 text-gray-400'>Max. 15 min wait + Verified Details</p>
                <span className='text-xs '> <span className='text-green-600'>Open</span>	• <span className='text-gray-400'>Updated today</span></span>
              </div>
              {/* <select
                className="block w-38 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={dataId}
                onChange={(e) => setSelectedClinicId(e.target.value)}
              >
                {
                  data.clinic.clinic.clinic.map((clinic_val) => {
                    return (
                      <option value={clinic_val.id}>
                        <div className='p-4 hover:bg-blue-100 cursor-pointer' onClick={() => { setSelectedClinicId(clinic_val.id); close() }}>
                          <h3 className='text-lg font-semibold'>{clinic_val.hospital_name} </h3>
                        </div>
                      </option>
                    )

                  })
                }
              </select> */}

            </div>
            <div className='mt-1  border-y border-gray-200 flex h-10  items-center'>

              <div className='w-full   h-full flex items-center justify-center overflow-hidden'>
                <span className={`border-blue-600 border-b-2 w-[40%]  shrink-0 flex flex-row   items-center justify-center gap-2 `}>
                  <p className='text-sm '>{data.appointmentDate}</p>
                </span>

              </div>

            </div>
            <div className='w-full flex items-center justify-center gap-2 p-3 overflow-x-scroll '>
              <span className={`w-1/4 flex items-center justify-center border bg-blue-500 border-blue-500    px-2 py-1 rounded-md  text-white  text-sm shrink-0`}>{data.appointmentTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentComponent;

