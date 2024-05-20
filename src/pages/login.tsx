import React, { useEffect, useState } from 'react'
import {post} from '../utils/api-client';
import { redirect } from 'next/navigation';
import { API_URLS } from '@/utils/api-url';
import CustomInput from '@/components/ui/customInput';
import { useForm } from 'react-hook-form';
// useRouter
import { useRouter } from 'next/navigation'
 
// TODO: redirect URL implementation

const login = (props:any) => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({mode:'onSubmit'});
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError,setLoginError] = useState("")
  async function handleLogin(data:any) {
    alert("clicked")
    try{
   const response =  await post(API_URLS.login,{
    "password": data.password,
    "username": data.username
  })
     
  // take response.token  and set it as cookie with key token
      
  if (response?.token) {
    const token = response.token;
    // Set the token as a cookie with the key 'token' (securely)
    document.cookie = `token=${token}; path=/; SameSite=Lax; Secure`; // Add HttpOnly for extra security
    router.push('/dashboard')
  } else {
    // Handle login failure (e.g., display error message)
    console.error("Login failed: Invalid credentials or missing token in response.");
  }
}catch(error){
  setLoginError(error +"")
}
}
    useEffect(() => {
    console.log("!2314124124124124124");
    
    }, [])
    
  return (
    <div className='bg-primary-color h-screen flex flex-col'>
      <div className="text-white p-3 text-2xl">Grahsti</div>

      <img src="/dummp.webp" alt="" style={{mixBlendMode:"multiply", width:"75%"}}/>

      <div className="rounded-t-3xl bg-gray-200 flex-1">
        <div className="text-center p-6 text-xl font-medium text-stone-700">Login to you account</div>
      <div className="rounded-t-3xl bg-white  p-5 h-full">
        <CustomInput keyname="username" label='Username' placeholder='Email / Mobile' errors={errors} register={register} validations={{required:"Username is required"}} />
        <CustomInput  type='password' keyname="password" label='Password' placeholder='******' errors={errors} register={register} validations={{required:"Password is required"}} />
        {/* <CustomInput type='text' label='Username' key={"username"} onValueChange={setUsername} /> */}
        {/* <CustomInput type='password' label='Password' key={"password"}  onValueChange={setPassword}/> */}
        <div className="text-end text-sm font-bold text-primary-color p-2">Forgot Password?</div>
        {loginError && <p className='text-red-700 text-sm mt-1'>{loginError}</p> }
        <button className='bg-primary-color py-3 text-center rounded-full text-white font-bold mx-auto mt-2 block w-full' onClick={handleSubmit(handleLogin)}>Login</button>
        <div className="text-center text-sm font-medium text-stone-600 p-2">Dont have an account? <span className='font-bold text-primary-color'>Register here</span></div>
        
       </div>
      </div>
    </div>
  )
}

export default login