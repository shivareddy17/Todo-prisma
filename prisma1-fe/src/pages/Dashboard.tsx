import { useEffect, useRef, useState } from "react";
import ButtonComponent from "../components/ ButtonComponent";
import AddComponent from "../components/AddComponent";
import TodoComponent from "../components/TodoComponent";
import useFetch from "../components/useFetch";
import axios from "axios";

const Bakend_url = import.meta.env.VITE_BACKEND_URL
interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}
export default function Dashboard() {
  const [refresh,setRefresh]=useState(0)
  const [todos, setTodo] = useState<Todo[]>([
    
  ]);
  const fetchedtodos = useFetch(refresh);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    setTodo(fetchedtodos);
  }, [fetchedtodos,refresh]);

  function refreshTodo1(){
    setRefresh(prev=> prev+1)
    console.log("called",refresh)
  }

  async function toggle(id: number) {
    console.log("toggle called");
    const updatedTodo = !todos.find((todo) => todo.id === id)?.done;
    console.log(updatedTodo, id);
    setTodo((prevtodos) =>
      prevtodos.map((todo) =>
        todo.id == id ? { ...todo, done: !todo.done } : todo
      )
    );
    try {
      console.log("before axios");
      const response = await axios.put(
        `${Bakend_url}/done/${id}`,
        {
          done: updatedTodo,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data.msg);
    } catch (e) {
      console.log("update faied");
      setTodo((prevtodos) =>
        prevtodos.map((todo) =>
          todo.id == id ? { ...todo, done: !todo.done } : todo
        )
      );
    }
  }
    

  async function deleteTodo(id: number) {
       const response = await axios.delete(`${Bakend_url}/delete/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    console.log(response.data.msg);
    refreshTodo1()
    setTodo(prevtodo=> prevtodo.filter(todo=> todo.id!=id));
  }

  async function updateTodo() {
    console.log("Before API call: Updating Todo...");

    if (!editTodo || !titleRef.current || !descriptionRef.current) {
        console.log("Missing references or editTodo is null!");
        return;
    }

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const id = editTodo.id;

    console.log(`ID: ${id}, Title: ${title}, Description: ${description}`);
    
    try {
        console.log("Making PUT request...");

        const response = await axios.put(
            `${Bakend_url}/todos/${id}`,
            { title, description },
            { headers: { Authorization: localStorage.getItem("token") } }
        );

        console.log("API Response:", response.data);

        setEditTodo(null);

        setRefresh((prev) => prev + 1);

    } catch (error) {
        console.error("Failed to edit todo:", error);
    }
}

  return (
    <div className="w-full bg-white  h-screen p-2">
      <div className="flex justify-end">
        <div className="flex justify-between gap-2 ">
          
          <div>
          
            <ButtonComponent variant="primary" name="addtodo" />
          </div>
          <div>
            <ButtonComponent variant="primary" name="sharetodo" />
          </div>
        </div>
      </div>
      <div className="flex gap-4 p-2 justify-center">
        <AddComponent  refreshTodo={refreshTodo1}/>
      </div>
      <div className="flex flex-wrap p-3 gap-8 justify-center">
        {todos.map((todo) => (
          <TodoComponent
            key={todo.id}
            title={todo.title}
            description={todo.description}
            done={todo.done}
            onToggle={() => toggle(todo.id)}
            onEdit={() => setEditTodo(todo)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </div>
      {editTodo && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-20">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>
            <input
              type="text"
              defaultValue={editTodo.title}
              ref={titleRef}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <textarea
              defaultValue={editTodo.description}
              ref={descriptionRef}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <div className="flex justify-end gap-2">
              <button onClick={updateTodo} className="px-4 py-2 bg-blue-500 text-white rounded">
                Save
              </button>
              <button onClick={() => setEditTodo(null)} className="px-4 py-2 bg-gray-500 text-white rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
