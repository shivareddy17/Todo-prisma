import InputComponnent from '../components/InputComponnent'
import ButtonComponent from '../components/ ButtonComponent'
import { useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Bakend_url =import.meta.env.VITE_BACKEND_URL

export default function Sinup() {
  const usernameRef =useRef<HTMLInputElement>(null)
  const passwordRef=useRef<HTMLInputElement>(null)
  const firstnameRef=useRef<HTMLInputElement>(null)
  const lastnameRef=useRef<HTMLInputElement>(null)
  const [msg,setMsg]=useState()
  const navigate=useNavigate()

  async function submit(){
    const username=usernameRef.current?.value
    const password=passwordRef.current?.value
    const firstname=firstnameRef.current?.value
    const lastname=lastnameRef.current?.value

    const response= await axios.post(`${Bakend_url}/Signup`,{
      userName:username,
      password:password,
      firstName:firstname,
      lastName:lastname
    })
    setMsg(response.data?.msg)
    console.log( username,password,firstname,lastname)
    navigate("/Signin")
  }
  return (
    <div className='flex justify-center items-center w-screen h-screen'>

    <div className='bg-amber-200 max-w-72 min-h-60 rounded-lg shadow flex flex-col items-center
    gap-3 p-2'>
        <InputComponnent placeholder='username' reference={usernameRef}/>
        <InputComponnent placeholder='password'reference={passwordRef}/>
        <InputComponnent placeholder='firstname' reference={firstnameRef}/>
        <InputComponnent placeholder='lastname' reference={lastnameRef}/>
        <div className='flex justify-center'>
        <ButtonComponent variant='primary' name='Signup' onClick={submit}/>

        </div>
        {msg}
    </div>
    
    </div>
  )
}
