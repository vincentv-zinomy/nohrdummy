import { Fragment, ChangeEvent, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { convertArrayToObject, modalStateDataI } from "./NodeTypes";
import TextAreaInputComp from "./InputComponents/TextAreaInputComp";
import TextInputComp from "./InputComponents/TextInputComp";
import NumberInputComp from "./InputComponents/NumberInputCompt";
import PasswordInputComp from "./InputComponents/PasswordInputComp";
import ButtonComp from "./InputComponents/ButtonComp";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: modalStateDataI[];
  label: string;
  handleSave?: () => void;
};

export default function AddContactModal({
  open,
  setOpen,
  data,
  handleSave,
  label,
}: Props) {
  const [nodeData, setNodeData] = useState(convertArrayToObject(data));

  const handleChange = (e: any) => {
    setNodeData({ ...nodeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // handleSave()
  };
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
            <div className="flex   h-full   items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="  transform overflow-hidden rounded-lg bg-white   px-4 pt-5 pb-4 text-left shadow-xl transition-all  h-[90%] w-full flex flex-col   max-w-3xl sm:p-6">
                  <div>
                    <div className=" mb-5 text-left  ">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        {label}
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="h-full rounded-md bg-slate-50">

                  <div className="mt-6  h-fit   grid grid-cols-2  ">
                    {data.map((x) => {
                      return (
                        <div key={x.id} className="col-span-1">
                          {x.type === "text" && (
                            <TextInputComp
                              label={x.label}
                              name={x.name}
                              handleChange={handleChange}
                              value={nodeData[x.name]}
                            />
                          )}
                          {x.type === "number" && (
                            <NumberInputComp
                              label={x.label}
                              name={x.name}
                              handleChange={handleChange}
                              value={nodeData[x.name]}
                            />
                          )}
                          {x.type === "password" && (
                            <PasswordInputComp
                              label={x.label}
                              name={x.name}
                              handleChange={handleChange}
                              value={nodeData[x.name]}
                            />
                          )}
                          {x.type === "textarea" && (
                            <TextAreaInputComp
                              label={x.label}
                              name={x.name}
                              handleChange={handleChange}
                              value={nodeData[x.name]}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div> 
                  </div>
                <ButtonComp handleClick={handleSubmit}>
                    Save
                </ButtonComp> 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
