import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon  } from '@heroicons/react/20/solid'
 

 
 

export default function TailwindNav({menu}) {
  return (
    <Popover className="relative  ">
      <Popover.Button className="inline-flex items-center     outline-none">
        <div className='font-outfit text-md'>{menu.name}</div>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1" 
      >
        <Popover.Panel className="absolute -right-5  z-10 mt-5 flex w-screen max-w-max px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-lg bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-2">
              {menu.subMenu.map((item) => (
                <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-2 hover:bg-gray-200">
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white">
                    <item.icon className="h-6 w-6 text-brand-green group-hover:text-brand-green" aria-hidden="true" />
                  </div>
                  <div>
                    <a href={item.href} className="font-semibold text-gray-900">
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}