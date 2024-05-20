import AddExpense from '@/components/AddExpense';
import ExpenseCard from '@/components/ExpenseCard';
import Button from '@/components/ui/button';
import { get } from '@/utils/api-client';
import { API_URLS } from '@/utils/api-url';
import usePullToRefresh from '@/utils/hooks/pullToRefresh';
import { getAuthorizationHeaders } from '@/utils/utilityService';
import { group } from 'console';
import Link from 'next/link';
import React, { useState } from 'react'

const GroupDetails = (props: any) => {
  // console.log(props);
  const [showAllMonths, setShowAllMonths] = useState(false)
  const [enableAddExpense, setEnableAddExpense] = useState(false)
  const [expenseList, SetExpenseList] = useState(props.expenses || [])
  const [isAdminMember,setIsAdminMember] = useState(props?.memberDetails?.isAdmin)
  // const [data, setData] = useState([]);
  const { isRefreshing, handleTouchStart, handleTouchMove, handleTouchEnd } = usePullToRefresh(async () => {
    // const response = await fetch('/api/expenses'); // Replace with your API endpoint
    // const newData = await response.json();
    await refetchExpenseList(props.groupId);
    return;
  });

  async function refetchExpenseList(groupId: any) {
    alert()
    const expenses = await get(API_URLS.getExpenses(groupId), {}, getAuthorizationHeaders())
    SetExpenseList(expenses);
  }
  return (
    <div className='bg-primary-color text-white overflow-hidden'>
      {isRefreshing && <p>Fetchcing new data</p>}
      <div className="header  flex justify-between font-bold  p-5 " onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        <Link href={'/dashboard'} className=" flex-1" >{"<"}</Link>
        <div className="grouptitle flex-1 text-center">{props.groupDetails.title}</div>
        <div className="flex-1 text-end">{"i"}</div>

      </div>
      <div className="month-container  px-5 ">
        <div className="flex justify-between">
          <div>
            <div className="block font-semibold" onClick={() => setShowAllMonths(!showAllMonths)}>{"May'24"} ^</div>
            <small>This month</small>
          </div>
          <div className="sort"></div>
        </div>
        {showAllMonths && <div className="horizontalList">
          <ul className=' whitespace-nowrap overflow-auto flex flex-row-reverse'>
            {["JAN'24", "FEB'24", "MAR'24", "APR'24", "MAY'24"].reverse().map(month => {
              return (<li className='inline-block  text-center mx-1 py-3 px-4' >{month}</li>)
            })}
          </ul>
        </div>}

      </div>

      <div className="expenses mt-5 bg-white text-stone-800 rounded-t-2xl p-5 ">
        <div className="flex justify-between">
          <h2 className='font-semibold self-center text-lg '>Expenses</h2>
         {isAdminMember &&  <h1>sjdnvjsndj jd</h1>}
          <small className='w-1/5'>
            <Button varaiant={"secondary"} text={"+ Add"} onClick={() => { setEnableAddExpense(true) }} />
          </small>
        </div>
        <div className="expensesListing">
          {expenseList.map((expense: any) => {
            // console.log("-----------",expense);

            return (<ExpenseCard data={expense} />)
          })}
        </div>

      </div>
      {enableAddExpense && <AddExpense groupId={props.groupDetails.id} groupName={props.groupDetails.title} refreshData={() => refetchExpenseList(props.groupDetails.id)} close={() => setEnableAddExpense(false)} />}
    </div>
  )
}

export default GroupDetails

export async function getServerSideProps(context: any) {
  // console.log(context.params);
  const groupId = context.params['id']

  const groupDetails = await get(API_URLS.groupsDetails(groupId), {}, getAuthorizationHeaders(context))
  const expenses = await get(API_URLS.getExpenses(groupId), {}, getAuthorizationHeaders(context))
  const memberDetails = await get(API_URLS.getGroupMemberDetails(groupId), {}, getAuthorizationHeaders(context));
       
  return {
    props: {
      groupId,
      groupDetails,
      expenses,
      memberDetails
    }
  }
}