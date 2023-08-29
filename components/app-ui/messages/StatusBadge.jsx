import { classNames } from "@/lib/common";

export default function Badge({ text, type }) {

  let color = "bg-green-100 text-green-800";
  if (type === "error") {
    color = "bg-red-100 text-red-800";
  }
  if (type === "warning") {
    color = "bg-yellow-100 text-yellow-800";
  }
  return (
    <>
      <span className={
        classNames(
          `inline-flex items-center rounded-full  px-2.5 py-0.5 text-xs font-medium `,
          color
        )
      }>
        <svg className={classNames("-ml-0.5 mr-1.5 h-1 w-1 ", color)} fill="currentColor" viewBox="0 0 8 8">
          <circle cx={4} cy={4} r={3} />
        </svg>
        {text}
      </span>
    </>
  )
}
