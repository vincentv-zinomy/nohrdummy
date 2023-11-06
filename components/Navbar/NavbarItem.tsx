
import React from 'react'
import {BsChevronDown} from 'react-icons/bs'
import {useState} from 'react' 

type Props = {
  menu:{
    name: string,
    subMenu:any
  }
}

function NavbarItem({menu}: Props) {
  
  const [open ,setOpen] = useState(false)

  return (
    <div>
    <button className='flex items-center gap-2 text-lg font-outfit' onClick={()=>setOpen(!open)}>
      {menu.name} <span><BsChevronDown size={10}/></span>
    </button>
      <div className={`${open ? 'block' : 'hidden'}  `}>
            <div className=" max-w-md flex-auto overflow-hidden r  bg-white text-sm leading-6   ">
              <div className="p-1">
                {menu.subMenu.map((item:any) => (
                  <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-2 hover:bg-gray-200 items-center  ">
                    <div className="  flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white">
                      <item.icon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div>
                      <a href={item.href} className="font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="  text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div> 
      </div>
    </div>
  )
}

export default NavbarItem