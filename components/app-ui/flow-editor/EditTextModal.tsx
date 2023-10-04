import { Fragment, ChangeEvent } from 'react'
import { Dialog, Transition } from '@headlessui/react'
 

type Props = {
  open:boolean,
  setOpen:(value:boolean)=>void,
  name:string,
  state:any,
  setState:any
}

export default function EditTextModal({open,setOpen,name}:Props) {
  // const {   textModalData } =
  //   useContext(CustomValuesContext);
  console.log(name)
    // console.log(textModalData)
    // const {name, value, setState, state} = textModalData

    // const [content, setContent] = useState(value)

    // if(value){

    //   console.log(content, 'content')
    // }

    // console.log(content)
    
    const handleChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
      console.log(e.target.value)
      // setContent(e.target.value)

      // setState({...state, [name]:e.target.value})
    }
 

  return (
    <>
     
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:h-full  max-w-lg sm:p-6">
                <div>
                   
                  <div className="  text-left  ">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Edit Text 
                    </Dialog.Title>
                    <div className="mt-1">
                      <p className="text-sm text-gray-500">
                      Edit your text.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <textarea  id="" className='inline-flex w-full justify-center rounded-md border  px-4 py-2 text-base   shadow-sm hover:border-indigo-700 focus:outline-none   sm:text-sm ' 
                  rows={12}  
                    // name={name}
                    // value={value}
                    onChange={handleChange}
                  ></textarea>
                  <button
                    type="button"
                    className="inline-flex mt-2 w-fit justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Finish Editing
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  )
}
