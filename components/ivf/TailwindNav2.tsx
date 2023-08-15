import { Fragment } from 'react'
import { Listbox, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'





export default function TailwindNav2({ menu, setClinic }: any) {
  return (
    <Popover className={'dropshadow-md absolute right-3 outline-none'}>
      <Popover.Button className='text-right ml-auto mr-0 w-full text-blue-500'>{menu.name}</Popover.Button>
      <Popover.Panel className='z-20'>
        {({ close }) => (
          <div className='w-fit shadow-lg bg-white'>
            {menu.subMenu.map((item: any) => (
              <div className='p-4 hover:bg-blue-100 cursor-pointer' onClick={() => { setClinic(item); close() }}>
                <div className='flex justify-between gap-8 items-center'>
                  <h3 className='text-lg font-semibold'>{item.hospital_name} </h3>
                  <span>{item.fee}</span>
                </div>
                <p>{item.rating} ★ {item.address.area}</p>
              </div>
            ))}
          </div>
        )}
      </Popover.Panel>
    </Popover>
  )
}