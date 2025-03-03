import axios from "axios";
import { useEffect, useState } from "react";

interface Todo {
    id: number;
    title: string;
    description: string;
    done: boolean;
  }
export default function useFetch(refresh:number):Todo[] {

    const [fetchedtodos,setTodos]=useState<Todo[]>([])

    async function fetchdata(){
        const response= await axios.get("http://localhost:3000/todos",{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })

        const todos1=response.data.response
        console.log(response.data.response)
        setTodos(todos1)
    }
    useEffect(()=>{
        fetchdata()
        const interval =setInterval(()=>{
            fetchdata()
        },1000*100)

        return()=> clearInterval(interval)
    },[refresh])

    return fetchedtodos;
  
}
