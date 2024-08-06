import Button from '@/components/ui/button'
import Logo from '@/components/ui/logo'
import { post, get } from '@/utils/api-client'
import { API_URLS } from '@/utils/api-url'
import { getAuthorizationHeaders } from '@/utils/utilityService'
import { useRouter } from 'next/router'
import React from 'react'
// @ts-ignore
const JoinGroup = ({ groupId, hasMemberAlreadyJoined, groupDetails, ...props }) => {
  console.log(hasMemberAlreadyJoined);

  const router = useRouter()
  const handleJoinGroup = () => {
    if (!getAuthorizationHeaders()?.authorization) {
      router.push("/login?redirectUrl=group/" + groupId + "/join-group");
      return;
    }
    const requestGroupJoin = post(API_URLS.joinGroup(groupId), {}, getAuthorizationHeaders())
    router.replace("/group/" + groupId);
    return;

  }
  return (
    <div className=' bg-primary-color h-screen flex flex-col justify-between'>

      <div className="text-end p-5">
        <Logo size="50px" color="#b3b0ff" />
      </div>
      <div className="relative bg-white rounded-2xl  m-5 ">
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 350" className=''>
                    <path fill="#1e40af" className='shadow' fill-opacity="1" d="M0,128L40,154.7C80,181,160,235,240,245.3C320,256,400,224,480,181.3C560,139,640,85,720,64C800,43,880,53,960,69.3C1040,85,1120,107,1200,106.7C1280,107,1360,85,1400,74.7L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
                </svg> */}
        <div className="text-center absolute top-[-20vw] w-full">

          <div className="circle bg-yellow-100 w-[30vw] h-[30vw] inline-block rounded-full border-4 border-yellow-200  m-5 text-accent-color text-6xl" style={{ lineHeight: "25vw" }}>{groupDetails.title[0]}</div>

        </div>

        <div className="genral-details pt-20">
          <div className="font-bold text-center text-xl">{groupDetails.title}</div>
        </div>
        <div className="p-8 text-center">

          {hasMemberAlreadyJoined ? 'You are already member of this group.' : <p>You have been invited to join <br /> <strong>{groupDetails.title}.</strong></p>}
          <div className="mt-4">
            <Button text={hasMemberAlreadyJoined ? 'Go to group' : 'Join Group'} varaiant={'primary'} onClick={handleJoinGroup} />
          </div>

        </div>
      </div>

      <div className="text-white text-center py-5"> Powered by <span className='font-bold'>GRAHSTI</span></div>
    </div>
  )
}

export default JoinGroup

export async function getServerSideProps(context: any) {
  // console.log(context.params);
  const groupId = context.params['id']
  let hasMemberAlreadyJoined = false;
  if (getAuthorizationHeaders(context)?.authorization) {
    try {


      const memberDetails = await get(API_URLS.getGroupMemberDetails(groupId), {}, getAuthorizationHeaders(context));

      hasMemberAlreadyJoined = !!memberDetails?.id;
    } catch (error) {
      hasMemberAlreadyJoined = false;
    }
  }
  const groupDetails = await get(API_URLS.groupsDetails(groupId), {}, getAuthorizationHeaders(context))

  return {
    props: {
      groupId,
      hasMemberAlreadyJoined,
      groupDetails,
      // expenses
    }
  }
}