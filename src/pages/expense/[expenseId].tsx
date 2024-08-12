import AddExpense from '@/components/AddExpense'
import CategoryBadge from '@/components/ui/CategoryBadge'
import BottomCard from '@/components/ui/bottomCard'
import Button from '@/components/ui/button'
import CircularBadge from '@/components/ui/circularBadge'
import ArrowIcon from '@/components/ui/icons/arrowIcon'
import DelelteIcon from '@/components/ui/icons/deleteIcon'
import EditIcon from '@/components/ui/icons/editIcon'
import Logo from '@/components/ui/logo'
import { deleteRequest, get } from '@/utils/api-client'
import { API_URLS } from '@/utils/api-url'
import { getAuthorizationHeaders, getDateAndMonthName, getUserDetails, } from '@/utils/utilityService'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const ExpenseDetails = ({ expenseId, expenseDetails }: any) => {
  const router = useRouter();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [enableUpdate, setEnableUpdate] = useState(false)
  const [isEligibleToManipulate, setIsEligibleToManipulate] = useState(false);
  async function deleteExpense() {
    try {
      await deleteRequest(API_URLS.deleteExpense(expenseId), getAuthorizationHeaders());
      router.replace('/group/' + expenseDetails.groupId);
    } catch (error) {
      toast.error("Something went wrong. Delete Expense Failed.")
    }
  }

  useEffect(() => {
    const userDetails = getUserDetails();
    if (userDetails && userDetails.id && expenseDetails.userId == userDetails.id) {
      setIsEligibleToManipulate(true);
    }
  }, [])


  return (
    <div className=' bg-white pb-12'
    //  style={{ backgroundImage: "linear-gradient(180deg, rgb(30, 64, 175) 0.3%, rgb(74, 104, 247) 18.2%, rgb(133, 80, 255) 32.4%, rgb(198, 59, 243) 48.5%, rgb(250, 84, 118) 60.8%, rgb(252, 208, 74) 99.9%)" }}
    >
      <div className='header  pb-12 '>
        <div className="  flex justify-evenly font-bold  p-5 ">
          <Link href={'/group/' + expenseDetails.groupId} replace={true} className="" ><ArrowIcon dimension="25px" color="#475569" /></Link>
          <div className="grouptitle flex-1 text-center">{'Expense Details'}</div>
          {isEligibleToManipulate ?
            <div className=" text-end" onClick={() => { setShowDeleteConfirmation(true) }} ><DelelteIcon dimension="25px" color="#991b1b" /></div>
            :
            <div className="flex-1 text-end">&nbsp;</div>
          }
        </div>

      </div>
      <div className=" rounded-2xl shadow-md  m-5 p-6 backdrop-blur-lg" style={{ background: "radial-gradient(circle at 10% 20%, rgb(226, 240, 254) 0%, rgb(255, 247, 228) 90%)" }}>
        <div className="flex justify-between">
          <small className=''>{expenseDetails.settlementStatus}</small>
          <Logo size={"40px"} color={"#deb88757"} />
        </div>
        <div className=" py-5">
          <div className='font-semibold text-sm'>{expenseDetails.title}</div>
          <div className="amount text-5xl font-bold text-gray-600">₹{expenseDetails.amount}</div>
        </div>
        <div className="flex justify-between text-gray-600">
          <div className="createdOn">
            <small className='text-xs'>{getDateAndMonthName(expenseDetails.createdAt).day} {getDateAndMonthName(expenseDetails.createdAt).month}</small>
          </div>
          <div className="createdBy">
            <small className=' font-semibold '>{expenseDetails.createdByUsername.toUpperCase()}</small>
          </div>
        </div>

      </div>

      <div className="Category mx-5 p-5 rounded-2xl border ">
        <div className="font-bold text-slate-600 mb-3 text-sm ">Category</div>
        <div className="flex justify-start ">
          <div className="mr-4">
            {/* <CircularBadge letter={expenseDetails.category[0]} />\ */}
            <CategoryBadge categoryName={expenseDetails.category} />
          </div>
          <span className='self-center rounded-xl  text-slate-500 text-sm font-bold' > {expenseDetails.category}</span>
        </div>
      </div>

      {expenseDetails.description && <div className="Category m-5 p-5 rounded-2xl border  ">
        <div className="font-bold text-slate-600 mb-3 text-sm">Description</div>
        <p className='self-center rounded-xl bg-gray-50  p-4 text-slate-600' > {expenseDetails.description}</p>

      </div>}

      {isEligibleToManipulate && <div className="fixed bottom-0 text-red-800 w-full p-5 font-bold ">
        <div className='flex justify-center w-2/3 mx-auto  rounded-xl p-3 text-primary-color' onClick={() => { setEnableUpdate(true) }}>
          <EditIcon dimension="30px" color="#1e40af" />
          <span className='mx-2 self-center'> EDIT EXPENSE </span>
        </div>
      </div>}


      {showDeleteConfirmation && <BottomCard active={showDeleteConfirmation} close={() => setShowDeleteConfirmation(false)} >
        <div className="flex justify-center mt-12 mx-auto">
          <DelelteIcon dimension="100px" color="#f5b8b8" />
        </div>
        <div className='my-5 text-center font-semibold text-slate-600'>This action will permanently delete expense.</div>
        <div className="">
          <Button text={"Confirm Delete"} varaiant={'danger'} key={"confirm"} onClick={deleteExpense} />
        </div>
      </BottomCard>}


      {enableUpdate && <AddExpense groupId={expenseDetails.groupId} expenseDetails={expenseDetails} refreshData={() => { router.replace('/group/' + expenseDetails.groupId); }} close={() => setEnableUpdate(false)} />}

    </div>
  )
}

export default ExpenseDetails

export async function getServerSideProps(context: any) {
  // console.log(context.params);
  const expenseId = context.params['expenseId']

  const expenseDetails = await get(API_URLS.getExpenseDetail(expenseId), {}, getAuthorizationHeaders(context));

  return {
    props: {
      expenseId,
      expenseDetails,
    }
  }
}