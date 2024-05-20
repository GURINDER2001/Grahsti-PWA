import React, { useState } from 'react';



// @ts-ignore

function CustomInput({ register, keyname, label = "", type = "text", errors, validations, ...props }) {
    return (
        <div className='flex flex-col my-3'>
            {label && <label className='text-xs text-[#999]' htmlFor={keyname}>{label}</label>}
            <input
                className={`${props.modifyclass} p-2 border-b border-b-[#ccc] bg-transparent -md focus:outline-none focus:border-b-[#999]`}
                type={type}
                id={keyname}
                {...register(keyname, validations)}
                {...props}
            />
            {errors[keyname] && <p className="text-red-700 text-sm mt-1">{errors[keyname].message}</p>}
        </div>
    );
}

export default CustomInput;
