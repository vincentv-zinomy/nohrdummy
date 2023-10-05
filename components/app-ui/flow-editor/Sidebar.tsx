import { navigation } from "./ReactFlowComponent";
import { CodeBracketIcon, DocumentArrowDownIcon, DocumentArrowUpIcon, FolderArrowDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import DragMenuItems from "./DragMenuItems";


const Sidebar = ( ) => {
  return (
    <div className="h-full md:inset-y-0 md:flex md:w-72 md:flex-col noscroll">
      <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white noscroll">
        <div className="flex flex-1 flex-col overflow-y-auto  noscroll  ">
          <nav className="  flex-1 space-y-1 bg-white noscroll  ">
            <div className="flex items-center justify-between px-2 pt-2">
                <button className="p-2 border rounded-md hover:bg-slate-50 shadow-sm active:bg-slate-100 bg-white">
                  <DocumentArrowDownIcon className="h-6 w-6 text-gray-500" />

                </button>
                <button className="p-2 border rounded-md hover:bg-slate-50 shadow-sm active:bg-slate-100 bg-white">
                  <DocumentArrowUpIcon className="h-6 w-6 text-gray-500" />
                </button>
                <button className="p-2 border rounded-md hover:bg-slate-50 shadow-sm active:bg-slate-100 bg-white">
                  <CodeBracketIcon className="h-6 w-6 text-gray-500" />
                </button>

                <button className="p-2 border rounded-md hover:bg-slate-50 shadow-sm active:bg-slate-100 bg-white">
                  <FolderArrowDownIcon className="h-6 w-6 text-gray-500" />

                </button>
            </div>
            <div className=" ">
              <div className="relative p-2  flex items-center">
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Search"
                />
                <div className="absolute inset-y-0 right-4 flex items-center justify-center">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>
            <div className=" ">
              {navigation.map((item) => (
                <DragMenuItems key={item.name} item={item} />
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
