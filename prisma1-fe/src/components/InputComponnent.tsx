interface inputProps{
placeholder:string,
reference?:any
}

export default function InputComponnent({placeholder,reference}:inputProps) {
  return (
    <div>
        <input type={"text"} placeholder={placeholder} ref={reference} className={`p-2 rounded-lg m-1 bg-amber-50`}/>
    </div>
  )
}
