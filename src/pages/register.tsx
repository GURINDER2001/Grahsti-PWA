import React, { useEffect, useState } from 'react'
import { post } from '../utils/api-client';
import { redirect } from 'next/navigation';
import { API_URLS } from '@/utils/api-url';
import CustomInput from '@/components/ui/customInput';
import { useForm } from 'react-hook-form';
// useRouter
import { useRouter } from 'next/navigation'
import Link from 'next/link';

const Register = (props: any) => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, watch } = useForm({ mode: 'onSubmit' });
  const [registrationError, setRegistrationError] = useState("")

  async function handleRegister(data: any) {
    try {
      const response = await post(API_URLS.register, {
        "fullName": data.fullname,
        "mobileNumber": data.mobile,
        "email": data.email,
        "password": "12345678" || data?.password,
      })

      // take response.token  and set it as cookie with key token

      if (response?.id) {
        router.push('/login?prefill=' + response.mobileNumber);
      } else {
        // Handle login failure (e.g., display error message)
        console.error("Login failed: Invalid credentials or missing token in response.");
      }
    } catch (error: any) {
      setRegistrationError(error + "")
    }
  }
  const validateMobile = (value: any) => {
    const indianMobileRegex = /^\d{10}$/;
    return indianMobileRegex.test(value) ? undefined : 'Invalid mobile number';
  };

  const validateEmail = (value: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? undefined : 'Invalid email';
  };

  return (
    <div className='bg-primary-color h-screen flex flex-col'>

      {/* <img src="/dummp.webp" alt="" style={{mixBlendMode:"multiply", width:"75%"}}/> */}
      <div className="text-center font-bold text-8xl text-white opacity-20 p-8 mt-10 rounded-full ">G</div>
      <div className="text-center text-white tracking-wider">
        <span className='opacity-80 '>Welcome To </span>
        <span className='block text-5xl font-bold opacity-85'>Grahsti</span>
      </div>


      <div className=" bg-white flex-1 h-[140vw] bottom-0 fixed w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 350" className=''>
          <path fill="#1e40af" className='shadow' fill-opacity="1" d="M0,128L40,154.7C80,181,160,235,240,245.3C320,256,400,224,480,181.3C560,139,640,85,720,64C800,43,880,53,960,69.3C1040,85,1120,107,1200,106.7C1280,107,1360,85,1400,74.7L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
        </svg>
        <div className="absolute bg-primary-color w-full top-[-10px]">&nbsp;</div>

        <div className="text-center p-6 pt-0 text-xl font-medium text-stone-700">Register to you account</div>
        <div className="rounded-t-3xl p-5 pt-0 h-full">
          <CustomInput keyname="fullname" label='Fullname' placeholder='Your name' errors={errors} register={register} validations={{ required: "Fullname is required" }} />
          <CustomInput keyname="mobile" label='Mobile No' type='number' placeholder='99XXX XXX45' errors={errors} register={register} validations={{ required: "Mobile no is required", validate: validateMobile }} />
          <CustomInput keyname="email" label='Email' type='email' placeholder='sample@xyz.com' errors={errors} register={register} validations={{ required: "Email is required", validate: validateEmail }} />
          {/* <CustomInput  type='password' keyname="password" label='Password' placeholder='******' errors={errors} register={register} validations={{required:"Password is required"}} /> */}

          {registrationError && <p className='text-red-700 text-sm mt-1'>{registrationError}</p>}
          <button className='bg-primary-color py-3 text-center rounded-full text-white font-bold mx-auto mt-5 block w-full' disabled={!watch('fullname') && (!watch('mobile') || !watch('email'))} onClick={handleSubmit(handleRegister)}>Register</button>
          <div className="text-center text-sm font-medium text-stone-600 p-2 mt-2">Already Registered? <Link href={'/login'} className='font-bold text-primary-color'>Login here</Link></div>

        </div>
      </div>
    </div>
  )
}

export default Register