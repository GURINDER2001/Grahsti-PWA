import React, { useEffect, useState } from 'react'
import Button from './ui/button'
import CustomInput from './ui/customInput';
import CircularBadge from './ui/circularBadge';

import { useForm } from 'react-hook-form';
import { get, post, put } from '@/utils/api-client';
import { API_URLS } from '@/utils/api-url';
import { getAuthorizationHeaders } from '@/utils/utilityService';
// @ts-ignore
const AddExpense = ({ groupId, expenseDetails = null, isAdmin = false, close, refreshData, ...props }: any) => {
    const { register, handleSubmit, formState: { errors, isValid }, reset, setValue } = useForm({ mode: 'onSubmit' });
    const [selectedCategory, setSelectedCategory] = useState('')
    const [categories, setCategories] = useState([])

    const AddNewExpense = async (formData: any, saveAndClose = true) => {
        const payloadData = {
            // ...formData,
            amount: formData.amount,
            title: formData.paid_for,
            description: formData.description || '',
            category: selectedCategory || "MISCELLANEOUS",
            isSettled: isAdmin ? true : false

        }

        const response = await post(API_URLS.addNewExpense(groupId), payloadData, getAuthorizationHeaders())

        //FIXME: do it with append mode not complete list reload
        refreshData()
        if (saveAndClose) {
            close()
            reset()
        }
        else {
            reset({ amount: null, paid_for: null, description: null })
            setSelectedCategory('');
        }

        console.log(payloadData);

    }

    const UpdateExpense = async (formData: any, saveAndClose = true) => {
        const payloadData = {
            // ...formData,
            amount: formData.amount,
            title: formData.paid_for,
            description: formData.description || '',
            category: selectedCategory || "MISCELLANEOUS",
            isSettled: isAdmin ? true : false

        }

        const response = await put(API_URLS.updateExpense(expenseDetails.id), payloadData, getAuthorizationHeaders())

        //FIXME: do it with append mode not complete list reload
        refreshData()
        if (saveAndClose) {
            close()
            reset()
        }
        else {
            reset({ amount: null, paid_for: null, description: null })
            setSelectedCategory('');
        }

        console.log(payloadData);

    }

    async function getCategories(groupId: string, updateLocal = false) {
        const local = localStorage.getItem("categories_" + groupId);
        let categories = local ? JSON.parse(local) : null
        if (!categories || updateLocal) {
            categories = await get(API_URLS.groupCategories(groupId), {}, getAuthorizationHeaders());
            localStorage.setItem("categories_" + groupId, JSON.stringify(categories));
        }
        const mergedCategories: any = [...categories.groupCategories, ...categories.defaultCategory];
        setCategories(mergedCategories);
        return mergedCategories;
    }
    useEffect(() => {

        getCategories(groupId)

    }, [groupId])

    useEffect(() => {

        if (expenseDetails) {
            setValue("amount", expenseDetails?.amount);
            setValue("paid_for", expenseDetails?.title);
            setValue("description", expenseDetails?.description);
            setSelectedCategory(expenseDetails.category)
        }
    }, [expenseDetails])

    return (
        <div
            className={'fixed left-0 right-0 bottom-0 top-0  overflow-auto transition-opacity duration-500  bg-white backdrop-blur-sm p-5 pb-0'}
        // onClick={close}
        >
            <Button varaiant={'close'} text='X' onClick={close} aria-label="Close panel" className={" transition ease-in-out w-8  duration-150 focus:outline-none absolute -right-2 -top-2 m-6 z-10 bg-gray-100 text-gray-300 font-bold rounded-full p-1"} />
            {/* <div className="font-bold text-xl text-primary-color ">Add Expense</div> */}
            <div className="grouptitle font-bold ">{expenseDetails ? "Update Expense" : 'Add Expense'}</div>
            {/* <img src="/dummp.webp" className="w-2/5 mx-auto block" alt="" /> */}
            <div className=" bg-zinc-300/25 border rounded-2xl p-4 text-stone-700 mt-5">
                <div className="text-sm text-center ">Amount spent</div>
                <div className="w-1/2 mx-auto ">
                    <div className="flex overflow-hidden bg-zinc-300/50 rounded-xl">
                        <div className="text-3xl self-center mx-3 ">₹</div>
                        <div className="inline ">
                            {/* FIXME :"Spme issue is ther scroll ho raha h khudse" */}
                            <CustomInput autoFocus modifyclass="placeholder:font-normal placeholder:text-sm text-2xl font-bold border-none w-4/5 " max={'300'} type='number' keyname={"amount"} register={register} placeholder='Enter amount' errors={errors} validations={{ required: true }} />
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <CustomInput modifyclass="placeholder:font-normal font-semibold" keyname={"paid_for"} label='Paid For*' placeholder="What did you spent on?" errors={errors} register={register} validations={{ required: true }} />

                    {/* <div className="flex justify-between">
                            <small className='self-center'>Date & Time</small>
                            <CustomInput type='date' keyname={"date"} errors={errors} register={register} validations={{required:true}} />
                        </div>
                        <div className="flex justify-between">
                            <small className='self-center'>Settled</small>
                            <CustomInput type='checkbox' keyname={"settled"} errors={errors} register={register} validations={{}} />
                            <input type="checkbox" name="" id="" />
                        </div> */}
                </div>
            </div>
            <div className="rounded-2xl bg-zinc-300/25  px-4 py-2 text-stone-700 mt-5 ">

                <CustomInput modifyclass="text-sm" keyname={"description"} label='Description' errors={errors} register={register} validations={{}} />
            </div>
            <div className=" bg-zinc-300/25 border rounded-2xl p-4 text-stone-700 mt-5">

                <div className="flex justify-between">
                    <small className='self-center text-[#999]'>Category</small>
                    {/* <small onClick={() => setEnableCategoryBottomCard(true)}>+</small> */}

                </div>
                <ul className='grid grid-cols-4'>
                    {categories.map(category => {
                        return (<li className={`${selectedCategory == category ? 'bg-blue-400/25' : ''} p-2 m-2 text-center  rounded`} key={category} onClick={() => { setSelectedCategory(category) }}>
                            <CircularBadge letter={category[0]} />
                            <div className='text-[8px] font-medium text-ellipsis max-w-max mx-auto mt-1  text-center overflow-hidden whitespace-nowrap'> {category}</div>
                        </li>)
                    })
                    }
                </ul>
            </div>
            <div className="fixed  bottom-0 left-0 right-0 py-5 mx-3 bg-white  justify-between grid grid-cols-2 gap-4  ">
                <Button varaiant={'ghost'} text={'Close'} onClick={close} />
                <Button varaiant={'primary'} text={'Save'} disabled={!isValid} onClick={handleSubmit((data) => expenseDetails ? UpdateExpense(data) : AddNewExpense(data))} />
            </div>
            {/* // TODO: Add cahnge date wala feature */}
            {/* {enableCategoryBottomCard && <BottomCard active={enableCategoryBottomCard} close={()=>setEnableCategoryBottomCard(false)}>
                {/* // Category Listing here */}
            {/* </BottomCard>} */}
        </div>
    )
}

export default AddExpense