import useSwipeActions from '@/utils/hooks/swipeActions';
import Link from 'next/link'
import React, { useState } from 'react'
import BottomCard from './ui/bottomCard';
import Button from './ui/button';
import CircularBadge from './ui/circularBadge';
import { put } from '@/utils/api-client';
import { API_URLS } from '@/utils/api-url';
import { getAuthorizationHeaders } from '@/utils/utilityService';
// @ts-ignore
const ExpenseCard = ({data:expense, ...props}) => {
    
    const [isSettled, setIsSettled] = useState(expense.status==="SETTLED"||false)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const { isRefreshing, handleTouchStart, handleTouchMove,handleTouchEnd } = useSwipeActions(async () => {
        // const response = await fetch('/api/expenses'); // Replace with your API endpoint
        // const newData = await response.json();
        // const expenses = await get(API_URLS.getExpenses(props.groupId),{},getAuthorizationHeaders())
        alert(expense.id+"-----------"+isSettled)
        if (!isSettled)
           await settleExpense(expense.id)
        else
            setShowConfirmation(true)
    
        return true;
      });

async function settleExpense(expenseId:any) {
    const settlementResponse = await put(API_URLS.settleExpense(expenseId),{},getAuthorizationHeaders() )
   setIsSettled(true)
}
async function unsettleExpense(expenseId:any) {
    const settlementResponse = await put(API_URLS.unsettleExpense(expenseId),{},getAuthorizationHeaders() )
    setShowConfirmation(false)
   setIsSettled(false)
}

  return (
    <>
  
    <Link href={'/expense/' + expense?.id} key={expense
        .id} className={`flex justify-between py-1 border-l-4 ${isSettled?"border-l-blue-800":"border-l-yellow-300"} border-l-red-600 border-b border-b-slate-100 bg-pink-jn400`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd} >
      {/* <a > */}

      <div className={` p-2  ${isSettled?"text-green-800":"text-stone-400"} text-center bg-k-100 flex-col justify-center`}>
        <div className='font-medium  '>12</div>
        <div className='text-[8px] '>MAY</div>
      </div>
      <CircularBadge letter={"❗" || expense.category[0]}/>
      <div className={` p-2 flex-1 w-1/4 flex flex-col justify-evenly`}>
      <div className="font-medium text-stone-500 text-sm text-ellipsis whitespace-nowrap overflow-hidden">{expense.title|| "Expense"}</div>
       {expense.description && <div className='text-[10px] text-gray-400 text-ellipsis w-4/5 whitespace-nowrap overflow-hidden'>{expense.description}asfjnaj knfkanskfn akjfkafaf</div>}
      </div>

      <div className={` p-2 text-right`}>
      <div className="font-bold text-green-600 text-sm text-ellipsis whitespace-nowrap overflow-hidden">{expense.amount|| "Expense"}</div>
       {<div className='text-[6px] text-gray-400 '>Gurinder Paid</div>}
      </div>
      {/* <span className='self-center font-bold text-lg  text-accent-color rounded-full'>{expense.amount}</span> */}
      {/* </a> */}
         
      </Link>
      {showConfirmation && <BottomCard active={showConfirmation} close={() => setShowConfirmation(false)} >
            Confirmation
            <small>You are about to unsettle a expense.</small>
            <div className="">
                <Button text={"Confirm"} varaiant={'primary'} key={"confirm"} onClick={async() => await unsettleExpense(expense.id)} />
            </div>
          </BottomCard>}
      </>
  )
}

export default ExpenseCard