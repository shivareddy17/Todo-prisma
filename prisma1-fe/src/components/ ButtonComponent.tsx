
import  { ReactElement } from 'react'
interface buttonprops{
    variant: "primary"|"secondary",
    name:string,
    icon?:ReactElement,
    onClick?: ()=>void

}

const variantStyes ={
    primary:"bg-blue-500 text-white",
    secondary:"bg-blue-200 text-blue-500"
}
const baseStyles = "px-4 py-2 rounded-md font-light";


export default function  ButtonComponent({variant,name,icon,onClick}:buttonprops) {
  return (
    <div>
        <button className={`${variantStyes[variant]} ${baseStyles} flex items-center transition hover:scale-105 cursor-pointer`} onClick={onClick}>
            <div className='flex  items-center'>
                {icon}
                <div className='pr-2'>
                    {name}
                </div>
            </div>
        </button>
    </div>
  )
}
