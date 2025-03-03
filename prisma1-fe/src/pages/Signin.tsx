import InputComponnent from '../components/InputComponnent'
import ButtonComponent from '../components/ ButtonComponent'
import axios from 'axios'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Bakend_url =import.meta.env.VITE_BACKEND_URL
export default function Sinin() {
   const usernameRef =useRef<HTMLInputElement>(null)
    const passwordRef=useRef<HTMLInputElement>(null)
    const navigate=useNavigate();

    async function submit(){
      const username=usernameRef.current?.value
      const password=passwordRef.current?.value
      const response= await axios.post(`${Bakend_url}/Signin`,{
        userName:username,
        password:password
      })
      const token=response.data.token
      console.log(token)
      localStorage.setItem('token',token)
      console.log( username,password)
      navigate('/dashboard')
    }

  return (
    <div className='flex justify-center items-center w-screen h-screen'>
    <div className='bg-amber-200 max-w-72 min-h-60 rounded-lg shadow flex flex-col items-center
    gap-3 p-2'>
        <InputComponnent placeholder='username' reference={usernameRef}/>
        <InputComponnent placeholder='password' reference={passwordRef}/>
        <div className='flex justify-center'>

        <ButtonComponent variant='primary' name='Signin' onClick={()=>submit()}/>

        </div>
    </div>
    </div>
    
  )
}
