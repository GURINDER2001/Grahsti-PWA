import CreateGroup from '@/components/CreateGroup'
import SpendChart from '@/components/SpendChart'
import BottomCard from '@/components/ui/bottomCard'
import CustomInput from '@/components/ui/customInput'
import { get, post } from '@/utils/api-client'
import { API_URLS } from '@/utils/api-url'
import { getAuthorizationHeaders } from '@/utils/utilityService'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const dashboard = (props:any) => {
  const [active, setActive] = useState(false)
  // useEffect(() => {
  //   const res =  get(API_URLS.groupsListing,{},getAuthorizationHeaders())
  // }, [])
  const userSpendingData = [
    {amount:"2000",day:"mon"  },
    {amount:"100",day:"tue"  },
    {amount:"2341",day:"wed"  },
    {amount:"33",day:"thru"  },
    {amount:"211",day:"fri"  },
    {amount:"2000",day:"sta"  }
]
  
  return (
    <div className='p-3'>
      <div className="text-3xl font-bold text-stone-300 my-5">Hi, <span className='text-stone-500'>There</span></div>

<SpendChart data={userSpendingData} />

<div>
  <div className="flex justify-between mt-5 mb-4">
  <h3 className="font-bold text-stone-500 text-xl self-center">Groups</h3>
    <button className=' font-bold rounded-full text-sm text-primary-color p-3' onClick={()=>setActive(true)}>+ ADD</button>
  </div>
    {props.groups.map((item:any)=>{
      return (<Link href={'/group/'+item.id} key={item.id} className='flex justify-between'>
        {/* <a > */}

        <span className='w-12 h-12 p-4 bg-stone-200 rounded-full'>T</span>
        <div className="px-4 pt-2 font-bold flex-1">{item.title || "Grop names"}</div>
        <span className='self-center font-extrabold text-xl text-accent-color rounded-full'>{">"}</span>
        {/* </a> */}
        
        </Link>)
    })}
    </div>

{active && <BottomCard active={active} close={()=>setActive(false)} >
 <CreateGroup close={()=>setActive(false)}/>
</BottomCard>}
    
    </div>
  )
}

export default dashboard

export async function getServerSideProps(context:any) {
  const groups = await get(API_URLS.groupsListing,{},getAuthorizationHeaders(context))

  return {
    props: {
      groups: groups,
    }
  }
}