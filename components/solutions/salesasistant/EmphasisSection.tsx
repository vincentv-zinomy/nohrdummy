/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
export default function EmphasisSection() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8 w-full">
        <div className="overflow-hidden rounded-lg bg-indigo-700 shadow-xl flex pr-10 w-full items-center justify-between">
          <div className="px-12 py-10 flex items-center justify-between w-full">
            <div className="lg:self-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                <span className="block">A Nugget of Wisdom
</span>
                 
              </h2>
              <p className="mt-4 text-lg leading-6 text-indigo-200">
              Don't be busy; be productive.

              </p>
              
            </div>

            
          </div>
          <button className="bg-white  h-fit font-bold  p-2 rounded-md w-36 text-indigo-600">
              Book A Demo
            </button>
        </div>
      </div>
    </div>
  )
}
