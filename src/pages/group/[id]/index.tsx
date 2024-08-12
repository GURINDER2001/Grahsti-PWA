import AddExpense from '@/components/AddExpense';
import ExpenseCard from '@/components/ExpenseCard';
import Button from '@/components/ui/button';
import ArrowIcon from '@/components/ui/icons/arrowIcon';
import Progress from '@/components/ui/progress';
import { get } from '@/utils/api-client';
import { API_URLS } from '@/utils/api-url';
import usePullToRefresh from '@/utils/hooks/pullToRefresh';
import { getAuthorizationHeaders, getUserDetails } from '@/utils/utilityService';
import { group } from 'console';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const GroupDetails = (props: any) => {
  const [showAllMonths, setShowAllMonths] = useState(false)
  const [enableAddExpense, setEnableAddExpense] = useState(false)
  const [expenseList, SetExpenseList] = useState(props.expenses || [])
  const [isAdminMember, setIsAdminMember] = useState(false)
  const [loggedInUserId, setLoggedInUserId] = useState(null)
  const [calculations, setCalculations] = useState({ total: 0, settled: 0, unsettled: 0 })

  const [selectedTimePeriod, setSelectedTimePeriod] = useState(props.date)

  // const [data, setData] = useState([]);
  const { isRefreshing, handleTouchStart, handleTouchMove, handleTouchEnd } = usePullToRefresh(async () => {
    // const response = await fetch('/api/expenses'); // Replace with your API endpoint
    // const newData = await response.json();
    await refetchExpenseList(props.groupId);
    return;
  });

  useEffect(() => {
    if (checkIsAdmin()) {
      setIsAdminMember(true)
    }
    // const cachedSelectedTimePeriod = JSON.parse(localStorage.getItem(`${props.groupId}/selectedTimePeriod`) || "null");
    // if(cachedSelectedTimePeriod)
    //   setSelectedTimePeriod(cachedSelectedTimePeriod)
  }, [])



  function checkIsAdmin() {
    let isAdmin = false;
    const userDetails = getUserDetails();
    if (userDetails && userDetails.id) {
      setLoggedInUserId(userDetails.id);
      isAdmin = props.groupDetails.createdBy == userDetails.id;
    }
    return isAdmin;
  }

  async function refetchExpenseList(groupId: any) {
    fetchExpenseList(groupId, selectedTimePeriod).then((expenss) => {
      SetExpenseList(expenss);
    })

    // const expenses = await get(API_URLS.getExpenses(groupId), {}, getAuthorizationHeaders())
    // SetExpenseList(expenses);
  }

  useEffect(() => {
    if (selectedTimePeriod.render)
      return;

    fetchExpenseList(props.groupId, selectedTimePeriod).then((expenss) => {
      SetExpenseList(expenss);
    })

    //  localStorage.setItem(`${props.groupId}/selectedTimePeriod`, JSON.stringify(selectedTimePeriod))
  }, [selectedTimePeriod])

  useEffect(() => {
    calculateAndShowTotalExpense(expenseList);
  }, [expenseList])

  function calculateAndShowTotalExpense(expenseList: any[]) {
    let calculationObject = {
      total: 0,
      settled: 0,
      unsettled: 0
    }

    for (const expense of expenseList) {
      calculationObject.total += expense.amount;
      if (expense.settlementStatus === "SETTLED")
        calculationObject.settled += expense.amount;
      else
        calculationObject.unsettled += expense.amount;
    }

    setCalculations(calculationObject);
  }

  const getPercentage = () => {
    const budget = props.groupDetails.totalBudget || 10000;
    const spend = calculations.total;
    return (spend / budget) * 100;
  }
  const getDisplayMonth = () => {
    return `${map[selectedTimePeriod?.month]}'${selectedTimePeriod?.year?.toString()?.slice(2, 4)}`
  }
  const map: any = {
    "JAN": 1,
    "FEB": 2,
    "MAR": 3,
    "APR": 4,
    "MAY": 5,
    "JUN": 6,
    "JUL": 7,
    "AUG": 8,
    "SEP": 9,
    "OCT": 10,
    "NOV": 11,
    "DEC": 12,
    1: "JAN",
    2: "FEB",
    3: "MAR",
    4: "APR",
    5: "MAY",
    6: "JUN",
    7: "JUL",
    8: "AUG",
    9: "SEP",
    10: "OCT",
    11: "NOV",
    12: "DEC",
  }
  function handleMonthChange(month: any) {
    const [m, y] = month.toString().split("'");

    if (selectedTimePeriod.month == map[m]) {
      return;
    }
    setSelectedTimePeriod({ month: map[m], year: "20" + y })
  }
  return (
    <div className='bg-primary-color text-white overflow-hidden'>
      {/* ---------------- REFRESH PULLOVER STARTS ------------------- */}
      {isRefreshing && <div className='flex justify-center mt-5 text-'>
        <svg xmlns="http://www.w3.org/2000/svg" className='animate-spin opacity-65' xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" viewBox="0 0 383.748 383.748" xmlSpace="preserve">
          <g fill='white'>
            <path d="M62.772,95.042C90.904,54.899,137.496,30,187.343,30c83.743,0,151.874,68.13,151.874,151.874h30   C369.217,81.588,287.629,0,187.343,0c-35.038,0-69.061,9.989-98.391,28.888C70.368,40.862,54.245,56.032,41.221,73.593   L2.081,34.641v113.365h113.91L62.772,95.042z" />
            <path d="M381.667,235.742h-113.91l53.219,52.965c-28.132,40.142-74.724,65.042-124.571,65.042   c-83.744,0-151.874-68.13-151.874-151.874h-30c0,100.286,81.588,181.874,181.874,181.874c35.038,0,69.062-9.989,98.391-28.888   c18.584-11.975,34.707-27.145,47.731-44.706l39.139,38.952V235.742z" />
          </g>
        </svg>
      </div>}
      {/* ---------------- REFRESH PULLOVER ENDS ------------------- */}
      {/* <div className="header  flex justify-between font-bold  p-5 " onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}> */}
      <div className="header  flex justify-between font-bold  p-5 ">
        <Link href={'/dashboard'} shallow={true} className="" ><ArrowIcon dimension="25px" color="#ffffff" /></Link>
        <div className="grouptitle flex-1 text-center">{props.groupDetails.title}</div>
        <Link href={`/group/${props.groupId}/details`} className="" >{"i"}</Link>

      </div>
      <div className="month-container  px-5 ">
        <div className="flex justify-between">
          <div onClick={() => setShowAllMonths(!showAllMonths)}>
            <Progress colour={"#ffffff"} percentage={getPercentage()} text={getDisplayMonth()} />
            {/* <div className="progress text-center relative m-1 float-left" >
          <div className="barOverflow relative w-[180px] h-[90px] mb-[-14px] overflow-hidden">
            <div className="bar absolute top-0 left-0 w-[180px] h-[180px] rounded-full box-border border-8 border-white b "></div>
          </div>
          <span>10</span>%
        </div> */}
            {/* <div className="block font-semibold" >{"Aug'24"}</div>
            <small>This month</small> */}
          </div>
          <div className=" text-center self-center">
            <small className="  text-[10px] font-bold">Total Spent</small>
            <div className="font-bold">₹{calculations.total}</div>
          </div>
          <div className=" text-center  self-center ">
            <small className="opacity-70 text-[10px]">Settled</small>
            <div className="font-semibold">₹{calculations.settled}</div>
          </div>
          <div className=" text-center  self-center">
            <small className="opacity-70 text-[10px]">Unsettled</small>
            <div className="font-semibold">₹{calculations.unsettled}</div>
          </div>
        </div>
        {showAllMonths && <div className="horizontalList">
          <ul className=' whitespace-nowrap overflow-auto flex flex-row-reverse '>
            {props.monthsMap.map((month: any) => {
              return (<li className={`${getDisplayMonth() == month ? "bg-[#506ac0] font-bold" : ""} rounded-md inline-block text-[10px]  text-center mx-1 py-3 px-4`} key={month} onClick={() => handleMonthChange(month)} >{month}</li>)
            })}
          </ul>
        </div>}
        {/* <small>Spent {(calculations.total/props.groupDetails.totalBudget)*100}% of ₹{props.groupDetails.totalBudget} budget. </small> */}
      </div>

      <div className="expenses mt-5 bg-white text-stone-800 rounded-t-2xl p-5 ">
        <div className="flex justify-between">
          <h2 className='font-semibold self-center text-lg '>Expenses</h2>
          <small className='w-1/5'>
            <Button varaiant={"secondary"} text={"+ Add"} onClick={() => { setEnableAddExpense(true) }} />
          </small>
        </div>
        <div className="expensesListing">
          {expenseList.map((expense: any) => {
            return (<ExpenseCard data={expense} isAdmin={isAdminMember} loggedInUserId={loggedInUserId} key={expense.id} />)
          })}
        </div>

      </div>

      {enableAddExpense && <AddExpense groupId={props.groupDetails.id} isAdmin={isAdminMember} refreshData={() => refetchExpenseList(props.groupDetails.id)} close={() => setEnableAddExpense(false)} />}
    </div>
  )
}

export default GroupDetails


function getMonthYearMap() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // Month is zero-indexed (0-11)

  const monthMap: string[] = [];

  for (let month = 0; month <= currentMonth; month++) {
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(currentYear, month));
    monthMap.push(`${monthName.toUpperCase()}'${currentYear.toString().slice(2, 4)}`);
    // [] = currentYear;
  }

  return monthMap.reverse();
}

async function fetchExpenseList(groupId: any, date: any, context?: any) {
  return await get(API_URLS.getExpenses(groupId), { ...date }, getAuthorizationHeaders(context));
}

export async function getServerSideProps(context: any) {
  const groupId = context.params['id']

  const groupDetails = await get(API_URLS.groupsDetails(groupId), {}, getAuthorizationHeaders(context))
  const currentDate = new Date();
  const date = {
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
    render: 1
  }
  const expenses = await fetchExpenseList(groupId, date, context);

  const memberDetails = null
  // await get(API_URLS.getGroupMemberDetails(groupId), {}, getAuthorizationHeaders(context));

  return {
    props: {
      groupId,
      groupDetails,
      expenses,
      memberDetails,
      date,
      monthsMap: getMonthYearMap()
    }
  }
}