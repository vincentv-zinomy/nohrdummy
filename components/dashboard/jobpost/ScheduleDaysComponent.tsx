import { DaysType, jobPostFormI } from '@/pages/dashboard/jobpost/create'
import React, { ChangeEvent, useEffect, useState } from 'react'

type Props = {
    formData:jobPostFormI,
    setFormData:(value:jobPostFormI)=>void
}

type daysArrayType = {
    id:number,
    day:DaysType,
    checked:boolean
}

const days:daysArrayType[] = [
    {id:1, day:'Monday', checked:false},
    {id:2, day:'Tuesday', checked:false},
    {id:3, day:'Wednesday', checked:false},
    {id:4, day:'Thursday', checked:false},
    {id:5, day:'Friday', checked:false},
    {id:6, day:'Saturday', checked:false},
    {id:7, day:'Sunday', checked:false},
]


const daysOfWeek:DaysType[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


const ScheduleDaysComponent = ({formData, setFormData}: Props) => {
    const [interviewDay, setInterviewDay] = useState<daysArrayType[]>(
        days.map((x,i)=>{
            if(formData.schedule_days.includes(x.day)) return {...x,checked:true,id:i}; 
            else return {...x, checked:false,id:i } 
        })
    )
    const [allDay, setAllDay] = useState(false)

    const handleAllDayChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked) {
            setAllDay(true)
            setInterviewDay([...interviewDay.map((day) => {return {...day, checked: false }})])
        }else{
            setAllDay(false)
        }
    }

    const handleChangeDays = (e:ChangeEvent<HTMLInputElement>) => {
        const updatedDays = interviewDay.map((day) => {
            if (day.day === e.target.name) {
              return { ...day, checked: e.target.checked };
            }
            return day;
        });
        setAllDay(false)
        setInterviewDay(updatedDays)
    }

    useEffect(()=>{
         console.log(formData.schedule_days)
         const arr = [...days]

         
        setInterviewDay(arr.map((x,i)=>{
            if(formData.schedule_days.includes(x.day)) return {...x,checked:true,id:i}; 
            else return {...x, checked:false,id:i } 
        }))
    },[])

    useEffect(()=>{
        if(allDay){
            setFormData({...formData, schedule_days:daysOfWeek})
        }else{ 
            const arr = interviewDay.filter((x)=>x.checked).map((x)=>x.day) as DaysType[]
            setFormData({...formData, schedule_days:arr})
        }
    },[interviewDay,allDay])

  return (
    <div className=" mt-6   ">
                <p className="mb-4 block text-sm font-medium text-gray-700 ">Schedule days <span className="text-red-500">*</span></p>
                <div className="relative flex items-start  " >
                      <div className="flex h-5 items-center">
                        <input
                          id='all_days'
                          name='all_days'
                          aria-describedby="comments-description"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" 
                          checked={allDay}
                          onChange={handleAllDayChange}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor='all_days' className="font-medium text-gray-700">
                          All Days
                        </label>
                      </div>
                    </div>
                <div className="flex mt-6 gap-6 flex-wrap" 
                // ref={ }
                >
                  {interviewDay.map((x)=>(
                    
                    <div className="relative flex items-start" key={`days_input_key_${x.id}`}>
                      <div className="flex h-5 items-center">
                        <input
                          id={x.day}
                          name={x.day}
                          checked={x.checked}
                          aria-describedby="comments-description"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          onChange={handleChangeDays}
                        //   ref={inputDaysRef}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor={x.day} className="font-medium text-gray-700">
                          {x.day}
                        </label>
                      </div>
                    </div>
                  ))}
                   
                </div>
           
            </div>
  )
}

export default ScheduleDaysComponent