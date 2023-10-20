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
export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-10 px-4 sm:px-6 lg:px-8 w-full">
        <div className="overflow-hidden rounded-lg bg-indigo-700 shadow-xl flex pr-10 w-full items-center justify-between">
          <div className="px-12 py-10 flex items-center justify-between w-full">
            <div className="lg:self-center">
              <h2 className="text-2xl font-bold tracking-tight text-white ">
                <span className="block">Each moment a lead waits, its value depreciates. Don't let your leads go cold, heat them up instantly with Zigment.
</span>
                 
              </h2>
            
              
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
