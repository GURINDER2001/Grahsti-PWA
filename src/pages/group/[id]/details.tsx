import Button from '@/components/ui/button'
import CircularBadge from '@/components/ui/circularBadge'
import ArrowIcon from '@/components/ui/icons/arrowIcon'
import { get } from '@/utils/api-client'
import { API_URLS } from '@/utils/api-url'
import { getAuthorizationHeaders } from '@/utils/utilityService'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'

const GroupDetails = ({ groupId, groupDetails, groupMembers, ...props }: any) => {
    const [shareUrl, setShareUrl] = useState(`https://grahsti.kalgury.in/group/${groupId}/join-group`)

    function copyToClipboard() {
        // if(window)
        navigator?.clipboard.writeText(shareUrl)
            .then(() => {
                toast.success("Copied")
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
        // const textArea = document.createElement("textarea");
        // textArea.value = shareUrl;
        // document.body.appendChild(textArea);
        // textArea.select();
        // document.execCommand('copy');
        // document.body.removeChild(textArea); 
    }
    return (

        <div className=' bg-white pb-12'
        //  style={{ backgroundImage: "linear-gradient(180deg, rgb(30, 64, 175) 0.3%, rgb(74, 104, 247) 18.2%, rgb(133, 80, 255) 32.4%, rgb(198, 59, 243) 48.5%, rgb(250, 84, 118) 60.8%, rgb(252, 208, 74) 99.9%)" }}
        >
            <div className='header  pb-12 '>
                <div className="  flex justify-between font-bold  p-5 ">
                    <Link href={'/group/' + groupId} replace={true} className=" flex-1" ><ArrowIcon dimension="25px" color="#475569" /></Link>
                    <div className="grouptitle flex-1 text-center">{'Group Details'}</div>
                    <div className="flex-1 text-end">&nbsp;</div>
                </div>

            </div>
            <div className="relative bg-white rounded-2xl  m-5 ">
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 350" className=''>
                    <path fill="#1e40af" className='shadow' fill-opacity="1" d="M0,128L40,154.7C80,181,160,235,240,245.3C320,256,400,224,480,181.3C560,139,640,85,720,64C800,43,880,53,960,69.3C1040,85,1120,107,1200,106.7C1280,107,1360,85,1400,74.7L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
                </svg> */}
                {/* <div className="absolute bg-primary-color w-full top-[-10px]">&nbsp;</div> */}
                <div className="text-center absolute top-[-20vw] w-full">

                    <div className="circle bg-yellow-100 w-[30vw] h-[30vw] inline-block rounded-full border-4 border-yellow-200 m-5 text-accent-color text-6xl" style={{ lineHeight: "25vw" }}>{groupDetails.title[0]}</div>

                </div>

                <div className="genral-details pt-20">
                    <div className="font-bold text-center text-xl">{groupDetails.title}</div>
                </div>
            </div>
            <div className="invite mx-5 p-5 rounded-2xl border shadow-md">
                <div className="flex justify-between ">
                    <small className='font-bold text-slate-400 self-center'> Monthly Budget</small>
                    <span className='p-3 rounded-xl bg-slate-50 w-1/3 text-right font-semibold text-slate-600' > {groupDetails.totalBudget}</span>
                </div>
            </div>
            <div className="invite  m-5 p-5 rounded-2xl border shadow-md">
                <div className="font-bold">Invite People</div>
                <div className='p-3 mt-4 rounded-xl bg-slate-50 text-xs flex justify-between w-full font-semibold text-slate-600' >
                    <span className='self-center'>
                        /join/{groupDetails.title.toString().split(" ").join("-").toLowerCase()}
                    </span>
                    <img src="/copy.png" alt="copy button" onClick={copyToClipboard} />
                </div>

                <small className="font-bold text-slate-400 block mt-5 mb-3 text-center">Social Share</small>
                <div className="flex  justify-around">
                    <div className="Demo__some-network">
                        <WhatsappShareButton
                            url={shareUrl}
                            title={"Hey buddy! I invite you to join my expense group on Grashti"}
                            separator=" - "
                            className="Demo__some-network__share-button"
                        >
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                    </div>
                    <div className="Demo__some-network">
                        <FacebookShareButton url={shareUrl} className="Demo__some-network__share-button">
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                    </div>
                    <div className="Demo__some-network">
                        <FacebookMessengerShareButton
                            url={shareUrl}
                            appId="521270401588372"
                            className="Demo__some-network__share-button"
                        >
                            <FacebookMessengerIcon size={32} round />
                        </FacebookMessengerShareButton>
                    </div>
                    <div className="Demo__some-network">
                        <TelegramShareButton
                            url={shareUrl}
                            title={"Hey buddy! I invite you to join my expense group on Grashti"}
                            className="Demo__some-network__share-button"
                        >
                            <TelegramIcon size={32} round />
                        </TelegramShareButton>
                    </div>
                    <div className="Demo__some-network">
                        <LinkedinShareButton url={shareUrl} className="Demo__some-network__share-button">
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                    </div>
                </div>
            </div>
            <div className="memebers m-5 mb-12 p-5 rounded-2xl border shadow-md">
                <div className="font-bold mb-5">All Members</div>
                {groupMembers?.map((member: any) => {
                    return (
                        <div className='flex p-2 ' key={member.id}>
                            <CircularBadge letter={member.username[0]} colorClass={"bg-green-100"} />
                            <span className='flex-1 px-5 self-center'> {member.username}</span>
                            {member.isAdmin && <span className='px-3  py-1 self-center text-xs  font-bold rounded-lg bg-accent-color text-white'>ADMIN</span>}
                        </div>
                    )
                })}
            </div>


        </div>

    )
}

export default GroupDetails

export async function getServerSideProps(context: any) {
    // console.log(context.params);
    const groupId = context.params['id'];
    const groupDetails = await get(API_URLS.groupsDetails(groupId), {}, getAuthorizationHeaders(context));
    const groupMembers = await get(API_URLS.getGroupMembers(groupId), {}, getAuthorizationHeaders(context));

    return {
        props: {
            groupId,
            groupDetails,
            groupMembers
        }
    }
}