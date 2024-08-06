import React, { useEffect, useState } from 'react'
import { get, post } from '../utils/api-client';
import { redirect } from 'next/navigation';
import { API_URLS } from '@/utils/api-url';
import CustomInput from '@/components/ui/customInput';
import { useForm } from 'react-hook-form';
// useRouter
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link';
import { getAuthorizationHeaders } from '@/utils/utilityService';

const Login = (props: any) => {
  const router = useRouter();
  const queryParams = useSearchParams()
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({ mode: 'onSubmit' });
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState("")

  useEffect(() => {
    if (!!queryParams.get("prefill")) {
      setValue('username', queryParams.get("prefill"))
    }
  }, [])


  async function handleLogin(data: any) {
    try {
      const response = await post(API_URLS.login, {
        "password": "12345678" || data?.password,
        "username": data.username
      })

      // take response.token  and set it as cookie with key token
      if (response?.token) {
        const token = response.token;
        // Set the token as a cookie with the key 'token' (securely)
        const cookieString = `token=${token}; path=/; SameSite=Lax; Secure`
        document.cookie = cookieString; // Add HttpOnly for extra security

        const userDetails = await get(API_URLS.getUserDetails, {}, getAuthorizationHeaders());
        localStorage.setItem("user",JSON.stringify(userDetails));

        router.push(queryParams.get('redirectUrl') ?? '/dashboard');

      } else {
        // Handle login failure (e.g., display error message)
        console.error("Login failed: Invalid credentials or missing token in response.");
      }
    } catch (error: any) {
      setLoginError(error?.detail + "")
    }
  }


  return (
    <div className='bg-primary-color h-screen flex flex-col'>
      <div className="text-white p-3 text-2xl">Grahsti</div>

      <img src="/dummp.webp" alt="" style={{ mixBlendMode: "multiply", width: "75%" }} />

      <div className="rounded-t-3xl bg-gray-200 flex-1 h-[80vw] bottom-0 fixed w-full">
        <div className="text-center p-6 text-xl font-medium text-stone-700">Login to you account</div>
        <div className="rounded-t-3xl bg-white  p-5 h-full">
          <CustomInput keyname="username" label='' placeholder='Enter your Mobile / Email' errors={errors} register={register} validations={{ required: "Username is required" }} />
          {/* <CustomInput  type='password' keyname="password" label='Password' placeholder='******' errors={errors} register={register} validations={{required:"Password is required"}} /> */}

          {/* <div className="text-end text-sm font-bold text-primary-color p-2">Forgot Password?</div> */}
          {loginError && <p className='text-red-700 text-sm mt-1'>{loginError}</p>}
          <button className='bg-primary-color py-3 text-center rounded-full text-white font-bold mx-auto mt-5 block w-full' disabled={!watch('username')} onClick={handleSubmit(handleLogin)}>Login</button>
          <div className="text-center text-sm font-medium text-stone-600 p-2 mt-2">Dont have an account?  <Link href={'/register'} className='font-bold text-primary-color'>Register here</Link></div>

        </div>
      </div>
    </div>
  )
}

export default Login