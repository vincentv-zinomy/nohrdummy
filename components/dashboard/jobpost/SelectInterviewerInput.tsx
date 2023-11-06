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
import { useEffect, useRef, useState } from "react";
 
import { Combobox } from "@headlessui/react";
import { BsChevronDown, BsPersonExclamation } from "react-icons/bs";

import {GrClose} from 'react-icons/gr'

const people = [
  {
    id: 1,
    name: "Leslie Alexander",
    email: "Jonedoe@gmail.com",
    calender_connected: false,
    checked: false,
  },
  {
    id: 2,
    name: "Joney marry",
    email: "Joneymarry@gmail.com",
    calender_connected: true,
    checked: false,
  },
  {
    id: 3,
    name: "John Miramontes",
    email: "Johnmiramontes@gmail.com",
    calender_connected: true,
    checked: false,
  },

  // More users...
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectInterviewerInput() {

  const [query, setQuery] = useState(""); 
  const [selectedInterviewer, setSelectedInterviewer] = useState([...people]);
  const [open, setOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [filterPeople, setFilterPeople] = useState<any>([...people])

  useEffect(()=>{
    if(query===""){
        setFilterPeople(selectedInterviewer)
    }else{
        setFilterPeople(selectedInterviewer.filter((person) => {
            return person.name.toLowerCase().includes(query.toLowerCase());
          }))
    }
  },[query])
  const filteredPeople =
    query === ""
      ? selectedInterviewer
      : selectedInterviewer.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleChange = (person: any, input: boolean) => {
    const newList = [...selectedInterviewer];
    if (input) {
      newList[selectedInterviewer.indexOf(person)].checked =
        !newList[selectedInterviewer.indexOf(person)].checked;
    } else {
      newList[selectedInterviewer.indexOf(person)].checked =
        newList[selectedInterviewer.indexOf(person)].checked;
    }
    setSelectedInterviewer([...newList]);
  };

  useEffect(()=>{
    console.log(selectedInterviewer
        .filter((x) => x.checked === true)
        .map(({ checked, ...rest }) => rest))

  },[selectedInterviewer])

  useEffect(() => {
    // Function to handle clicks outside the div
    const handleClickOutside = (event: any) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        // Clicked outside the div, do something here
        setOpen(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Combobox
        as="div"
        value={selectedInterviewer}
        onChange={setSelectedInterviewer}
        ref={divRef}
      >
        <div className="relative mt-4">
          <Combobox.Input
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(person: any) => ""}
            placeholder="Select Interviewer"
          />
          <Combobox.Button
            className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            <BsChevronDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          <Combobox.Options
            // open={true}
            static={open}
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md  bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {filterPeople && filterPeople.length > 0 && 
            filterPeople.map((person:any) => (
              <Combobox.Option
                key={`person_key_${person.id}`}
                value={String(person)}
                placeholder="Select Interviewer"
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9 rounded-md cursor-pointer",
                    active ? "bg-green-100  " : "text-gray-900"
                  )
                }
                onClick={() => handleChange(person, true)}
              >
                {({ active, selected }) => (
                  <div className="flex items-center gap-4 rounded-md p-1">
                    <input
                      id={String(person.id)}
                      aria-describedby="comments-description"
                      name={person.name}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      checked={person.checked}
                      onChange={() => handleChange(person, false)}
                    />
                    <div className={"block truncate"}>
                      <span className="text-brand-solidgreen text-sm font-semibold">
                        {person.name}
                      </span>
                      <span className="text-black text-sm font-normal">
                        {" "}
                        ({person.email}),
                      </span>{" "}
                      {person.calender_connected ? (
                        <span className="text-green-600 text-sm font-normal">
                          Calender Connected
                        </span>
                      ) : (
                        <span className="text-red-700 text-sm font-normal">
                          Calender Not Connected
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
      <div className="mt-4 flex flex-wrap gap-2">
        {selectedInterviewer && selectedInterviewer.map((person) => {
          return (
            <>
              {person.checked && (
                <div
                  className="px-3 py-1 bg-violet-300 bg-opacity-10 rounded-full border border-purple-500 justify-center items-center gap-2 inline-flex"
                  key={`interviewer_chips_keys_${person.id}`}
                >
                  <div className="justify-center items-center gap-3 flex">
                    <div>
                      <span className="text-green-900 text-sm font-semibold">
                        {person.name}
                      </span>
                      <span className="text-black text-sm font-normal"> </span>
                      <span className="text-zinc-900 text-sm font-normal">
                        ({person.email})
                      </span>
                      <span className="text-black text-sm font-normal">, </span>{" "}
                      {person.calender_connected ? (
                        <span className="text-green-600 text-sm font-normal">
                          Calender Connected
                        </span>
                      ) : (
                        <span className="text-red-700 text-sm font-normal">
                          Calender Not Connected
                        </span>
                      )}{" "}
                    </div>
                    <button
                      className="p-[1px] overflow-hidden rounded-full bg-red-500"
                      onClick={() => handleChange(person, true)}
                    >
                      <GrClose className="h-4 w-4 text-white bg-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </>
  );
}
