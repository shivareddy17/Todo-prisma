import DeleteIcon from "../assets/DeleteIcon"
import EditIcon from "../assets/EditIcon"

interface todoin{
  title:string,
  description:string,
  done:boolean,
  onToggle:()=>void
  onEdit:()=>void,
  onDelete:()=>void
}

export default function TodoComponent({title,description,done,onToggle,onEdit,onDelete}:todoin) {
  
  return (
    <div >
        <div className='w-60 min-h-24 rounded-lg bg-amber-50 p-3 '>
          <div className="flex justify-between items-center">
            <div className={`${done==true ? "text-xl line-through":"text-xl"}`}>
              {title}
            </div>
            {/* <div className="text-xl line-through">
              {title}
            </div> */}
            <div className="flex gap-2">
             
              <div onClick={onEdit} className="cursor-pointer">
              <EditIcon/>
              </div>

              <div onClick={onDelete} className="cursor-pointer">
              <DeleteIcon/>

              </div>
              <input type="checkbox" checked={done} onChange={onToggle}/>
            </div>
          </div>
          <div className="flex justify-center p-2">
            {description}
            
          </div>
        </div>
    </div>
  )
}
