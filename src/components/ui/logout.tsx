import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import BottomCard from './bottomCard';
import Button from './button';
const Logout = () => {
    const router = useRouter();
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false)
    const handleLogout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        router.replace('/login')
    }
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" onClick={() => setShowLogoutConfirmation(true)} height="30px" width="30px" version="1.1" id="Capa_1" viewBox="0 0 30.143 30.143" xmlSpace="preserve">
                <g fill='#999999'>
                    <path fill="#030104;" d="M20.034,2.357v3.824c3.482,1.798,5.869,5.427,5.869,9.619c0,5.98-4.848,10.83-10.828,10.83   c-5.982,0-10.832-4.85-10.832-10.83c0-3.844,2.012-7.215,5.029-9.136V2.689C4.245,4.918,0.731,9.945,0.731,15.801   c0,7.921,6.42,14.342,14.34,14.342c7.924,0,14.342-6.421,14.342-14.342C29.412,9.624,25.501,4.379,20.034,2.357z" />
                    <path fill="#030104;" d="M14.795,17.652c1.576,0,1.736-0.931,1.736-2.076V2.08c0-1.148-0.16-2.08-1.736-2.08   c-1.57,0-1.732,0.932-1.732,2.08v13.496C13.062,16.722,13.225,17.652,14.795,17.652z" />
                </g>
            </svg>

            {showLogoutConfirmation && <BottomCard active={showLogoutConfirmation} close={() => setShowLogoutConfirmation(false)} >
                <div className="flex justify-center mt-12 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" onClick={() => setShowLogoutConfirmation(true)} height="80px" width="80px" version="1.1" id="Capa_1" viewBox="0 0 30.143 30.143" xmlSpace="preserve">
                        <g fill='#999999'>
                            <path fill="#030104;" d="M20.034,2.357v3.824c3.482,1.798,5.869,5.427,5.869,9.619c0,5.98-4.848,10.83-10.828,10.83   c-5.982,0-10.832-4.85-10.832-10.83c0-3.844,2.012-7.215,5.029-9.136V2.689C4.245,4.918,0.731,9.945,0.731,15.801   c0,7.921,6.42,14.342,14.34,14.342c7.924,0,14.342-6.421,14.342-14.342C29.412,9.624,25.501,4.379,20.034,2.357z" />
                            <path fill="#030104;" d="M14.795,17.652c1.576,0,1.736-0.931,1.736-2.076V2.08c0-1.148-0.16-2.08-1.736-2.08   c-1.57,0-1.732,0.932-1.732,2.08v13.496C13.062,16.722,13.225,17.652,14.795,17.652z" />
                        </g>
                    </svg>
                </div>
                <div className='my-5 text-center'>You are about to log out! Are you sure?</div>
                <div className="">
                    <Button text={"Logout"} varaiant={'secondary'} key={"confirm"} onClick={handleLogout} />
                </div>
            </BottomCard>}
        </div>
    )
}

export default Logout