import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/24/solid";
import React, { ChangeEvent, Dispatch, FormEvent, useState } from "react"; 

type Props = {};



const CreateUpdateModals = ({
  initialState,
  inputFields,
  setCreateModal,
  action,
  createTitle,
  updateTitle
}: any) => {
  console.log(inputFields);
  const [details, setDetails] = useState(initialState);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(details);
  };
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black/50 z-20"
        onClick={() => setCreateModal(false)}
      />
      <div className="fixed w-1/2   bg-white inset-0 m-auto z-30 rounded-md  h-fit  ">
        <div className="w-full flex items-center justify-between px-4 pt-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900 ">
            {action==='create' ? createTitle : updateTitle}
          </h3>
          <button
            className="p-1 bg-slate-100 hover:bg-slate-200 rounded-full"
            onClick={() => setCreateModal(false)}
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form className="  max-h-[600px]  ">
            <div className="relative    mt-2 px-4   overflow-y-auto flex flex-wrap items-center justify-between">
                {inputFields.map((item: any) => (
                <div
                key={`inputfield-key-${item.key}`}
                className={`${
                    item.input_type === "textarea" ? "w-full" : "w-[48%]"
                } mb-4`}
                >
                <label
                    htmlFor={item.key}
                    className="block text-sm font-medium text-gray-700"
                >
                    {item.label}
                </label>

                <div className="mt-2">
                    {item.input_type === "input_text" && (
                    <input
                        type="text"
                        name={item.key}
                        id={item.key}
                        className="block w-full rounded-md    shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={details[item.key]}
                        onChange={handleChange}
                    />
                    )}
                    {item.input_type === "input_number" && (
                    <input
                        type="number"
                        name={item.key}
                        id={item.key}
                        className="block w-full rounded-md   shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={details[item.key]}
                        onChange={handleChange}
                    />
                    )}
                    {item.input_type === "select" && (
                    <select
                        id={item.key}
                        name={item.key}
                        className="block w-full rounded-md   shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={details[item.key]}
                        onChange={handleChange}
                    >
                        <option value={""}>Select Category</option>
                        {item.options.map((x: string) => (
                        <option value={x} key={`category-values-${x}`}>
                            {x}
                        </option>
                        ))}
                    </select>
                    )}
                    {item.input_type === "textarea" && (
                    <textarea
                        id={item.key}
                        name={item.key}
                        rows={3}
                        className="block w-full rounded-md   shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={details[item.key]}
                        onChange={handleChange}
                    />
                    )}
                </div>
                </div>
                ))}
            </div>
            <hr className="px-4" />
          <div className="pt-5  bg-white p-4  rounded-md  ">
            <div className="flex justify-end ">
              <button
                type="button"
                className="rounded-md border   bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setCreateModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateUpdateModals;
