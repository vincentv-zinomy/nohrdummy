/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { classNames } from '@/lib/common'
import { v4 as uuidv4 } from 'uuid'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

const people = [
  { id: 1, name: 'Leslie Alexander' },
  { id: 2, name:'Doe' },
  { id: 3, name:'Woods' },
  { id: 4, name:'John' },
]

 
export default function CustomTextSelectInput() {
  const [query, setQuery] = useState('')
  const [selectedPerson, setSelectedPerson] = useState(null)

  const [queue, setQueue] = useState<any[]>([{id:1, type:'input', value:''}])
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClick = (person:any) => {
    // console.log(person, 'person')
    // console.log(queue[queue.length - 1].value)

    if(queue[queue.length - 1].value.trim() === ''){
        const remque = queue.slice(0, -1)
        setQueue([
          ...remque,
          {id:uuidv4(),type:'option',value:person.name},
          {id:uuidv4(),type:'input',value:''}
         ])     
    }else{

        setQueue([
            ...queue,
            {id:uuidv4(),type:'option',value:person.name},
            {id:uuidv4(),type:'input',value:''}
        ])
    }
  }

  const handleDelete = (option:any) => {
    setQueue((prev)=>prev.filter((x)=>x.id!==option.id))
    setOpen(false)
  }

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <div className='bg-slate-50 py-2 px-6 flex flex-col    relative'>

    <div  >
      <p className="block  text-black">Assigned to</p>
      <div className="relative mt-1" ref={containerRef}>
        <div className='w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm' onClick={()=>setOpen(true)}>

            {
                queue.map((x)=>{
                    return(
                    <>
                        {x.type === 'input' &&
                            <input 

  className='text-base p-0  border-none outline-black outline-solid noborderinput'
                            key={x.id} 
                            type='text' 
                            value={x.value} onChange={(e)=>setQueue((prev)=>prev.map((y)=>{
                                if(y.id===x.id){
                                    y.value = e.target.value
                                }
                                return y
                            }))}/>
                        }
                        {
                            x.type === 'option' &&
                            <span
                            key={x.id}
                            className="px-1.5 py-0.5 text-sm border text-slate-600 flex items-center gap-1 rounded-full w-fit"
                          >
                            {x.value}
                            <button
                              className="p-0.5 hover:bg-slate-300 cursor-pointer rounded-full"
                              onClick={() => handleDelete(x)}
                            >
                              <XMarkIcon className="w-2.5 h-2.5" />
                            </button>
                          </span>
                        }
                    </>
                    )
                })
            }

        </div>
        

        { (
            <>
                {
                    open 
                    && 
                    <div className="absolute z-10 mt-1 h-fit w-full overflow-auto rounded-md bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        <div className='w-full rounded-md  relative bg-white py-2 px-2  sm:text-sm'>
                            <input 
                                type="text" 
                                className="w-full rounded-md border border-gray-300 bg-white py-2 px-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm pr-7  "
                                onChange={(event) => setQuery(event.target.value)}
                            />
                            <MagnifyingGlassIcon className='w-4 h-4 absolute inset-y-0 my-auto right-4 text-gray-300' />
                        </div>
                        {filteredPeople.map((person) => (
                        <div
                            key={person.id}
                            className={ 
                                'relative cursor-default hover:bg-slate-100 select-none py-2 rounded-md  pl-3 pr-9' 
                                
                            }
                                onClick={()=>handleClick(person)}
                            >
                            <>
                                <span className={``}>{person.name}</span>
                            </>
                        </div>
                        ))}
                    </div>
                }
            </>
        )}
      </div>
    </div>
    </div>
  )
}
 

