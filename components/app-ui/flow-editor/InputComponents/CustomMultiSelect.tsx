import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/lib/common";
import { XMarkIcon } from "@heroicons/react/24/outline";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
  { id: 7, name: "Caroline Schultz" },
  { id: 8, name: "Mason Heaney" },
  { id: 9, name: "Claudie Smitham" },
  { id: 10, name: "Emil Schaefer" },
];

type Props = {
  state: any;
  setState: (value: any) => void;
  label: string;
  list: any[];
  name: any;
};

const arrayToObj = (array: any[]) => {
  return array.map((element) => {
    return {
      name: element,
      checked: false,
    };
  });
};

export default function CustomMultiSelect({
  // state,
  // setState,
  label,
  lists,
}: // name
any) {
  const [selected, setSelected] = useState(arrayToObj(lists));

  const onChange = (e: any) => {
    setSelected((prevLists) =>
      prevLists.map((choice) => {
        if (choice.name === e.name) {
          choice.checked = !e.checked;
        }
        return choice;
      })
    );
  };

  return (
    <div className="bg-slate-50 py-2 px-6 flex flex-col    relative w-[300px]">
      {
        <Listbox value={selected} onChange={onChange}>
          {({ open }) => (
            <>
              <Listbox.Label className="block  text-black text-left">
                {" "}
                {label}
              </Listbox.Label>
              <div className="relative mt-2">
                <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white h-fit min-h-10  pl-1 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                  <div className="block truncate flex flex-wrap gap-1 pr-1 py-1.5">
                    <div className="inline-block   text-xs   text-slate-600 flex items-center border rounded-full opacity-0"/>
                    {selected.map((x) => {
                      if (x.checked) {
                        return (
                          <span
                            key={x.name}
                            className="px-1.5 py-0.5 text-xs border text-slate-600 flex items-center gap-1 rounded-full"
                          >
                            {x.name}
                            <button
                              className="p-0.5 hover:bg-slate-300 cursor-pointer rounded-full"
                              onClick={() => onChange(x)}
                            >
                              <XMarkIcon className="w-2.5 h-2.5" />
                            </button>
                          </span>
                        );
                      }
                    })}
                  </div>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10   max-h-60 w-full overflow-auto rounded-md bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm customscroll">
                    {selected.map((choice: any) =>{ 
                        if(!choice.checked){
                            return(
                                <Listbox.Option
                            key={`multi-select-${choice.name}`}
                            className={({ active }) =>
                              classNames(
                                active ? "  bg-indigo-50" : "",
                                "relative cursor-default text-gray-900 select-none py-2 rounded-md pl-3 pr-9"
                              )
                            }
                            value={choice}
                          >
                            {({ selected, active }) => (
                              <div className="flex items-center gap-2">
                                <input
                                  id="candidates"
                                  aria-describedby="candidates-description"
                                  name="candidates"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  checked={choice.checked}
                                />
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "block truncate"
                                  )}
                                >
                                  {choice.name}
                                </span>
                              </div>
                            )}
                                </Listbox.Option>
                            )}
                        }
                    )
                    }
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      }
    </div>
  );
}
