import { useRef, useState } from "react";
import InputComponnent from "./InputComponnent";
import ButtonComponent from "./ ButtonComponent";
import axios from "axios";
const Bakend_url =import.meta.env.VITE_BACKEND_URL


interface AddComponentIn{

    refreshTodo:()=>void
}

export default function AddComponent({ refreshTodo }: AddComponentIn) {
  const titleRef = useRef<HTMLInputElement>(null);
  const discriptionRef = useRef<HTMLTextAreaElement>(null);
  const [msg, setMsg] = useState();
  async function sendData() {
    const title = titleRef.current?.value;
    const discription = discriptionRef.current?.value;
    console.log(title, discription);
    if (titleRef.current && discriptionRef.current) {
      const response = await axios.post(
        `${Bakend_url}/todos`,
        {
          title,
          description: discription,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setMsg(response.data.msg);
      titleRef.current.value = "";
      discriptionRef.current.value = "";
      refreshTodo()
    }
  }

  return (
    <div>
      <div className="bg-gray-700 rounded-lg shadow-amber-50 min-w-60 min-h-36 flex justify-center">
       
        <div className="flex flex-col items-center p-2 gap-1">
          <InputComponnent placeholder={"title"} reference={titleRef} />
          <textarea

              placeholder={"discription"}
              ref={discriptionRef}
              className="w-full  border border-gray-300 rounded bg-amber-50"
            />
          <div className="flex justify-center">
            <ButtonComponent
              variant={"secondary"}
              name={"addtodo"}
              onClick={sendData}
            />
          </div>
        </div>
      </div>
      {msg}
    </div>
  );
}
