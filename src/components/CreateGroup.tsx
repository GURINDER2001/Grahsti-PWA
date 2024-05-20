import React, { useState } from 'react'
import CustomInput from './ui/customInput'
import Button from './ui/button'
import { useForm } from 'react-hook-form'
import { post } from '@/utils/api-client'
import { API_URLS } from '@/utils/api-url'
import { getAuthorizationHeaders } from '@/utils/utilityService'
// useRouter
import { useRouter } from 'next/navigation'
 


// @ts-ignore
const CreateGroup = ({close})=>{
    const router = useRouter()
    const { register, handleSubmit, formState: { errors, isValid },reset } = useForm({mode:'onSubmit'});
    const createNewGroup = async(data:any) => {
        console.log('Form submitted:', data, getAuthorizationHeaders());
       const response = await post(API_URLS.createGroup,data, getAuthorizationHeaders())
       console.log(response);
       reset();
       close();
        router.push('/group/'+response.id)
        // Process data here (e.g., send to an API endpoint, update local state)
      };
    
  return (
   <>
    <h2 className='font-bold'>Create Group</h2>
    <form className='p-3' onSubmit={handleSubmit(createNewGroup)}>
    <CustomInput keyname="title" label='Group title'  errors={errors} register={register} validations={{required:"Title is required"}} required />
    <CustomInput keyname="totalBudget" label='Budget' type='number' placeholder='0' errors={errors} register={register} validations={{required:"Budget is required"}} />
    <div className='mt-5 pt-2'>
    <Button varaiant={"primary"} text={"Create"} disabled={!isValid} />
    </div>
    </form>
   </>
  )
}

export default CreateGroup