import Button from '@/components/ui/button'
import { post,get } from '@/utils/api-client'
import { API_URLS } from '@/utils/api-url'
import { getAuthorizationHeaders } from '@/utils/utilityService'
import { useRouter } from 'next/router'
import React from 'react'
// @ts-ignore
const joinGroup = ({groupId,hasMemberAlreadyJoined, ...props}) => {
    console.log(hasMemberAlreadyJoined);
    
    const router = useRouter()
const handleJoinGroup = ()=>{
    if(!getAuthorizationHeaders()?.authorization){
        router.push("/login?redirectUrl=join-group/"+groupId);
        return;
    }
    const requestGroupJoin =  post(API_URLS.joinGroup(groupId),{}, getAuthorizationHeaders())
    router.replace("/group/"+groupId);
    return;

}
  return (
    <div>
       {hasMemberAlreadyJoined?'Go to group':'Join group'} {groupId}
        <Button text= {hasMemberAlreadyJoined?'Go to group':'Join group'}varaiant={'primary'} onClick={handleJoinGroup}/>
        </div>
  )
}

export default joinGroup

export async function getServerSideProps(context: any) {
    // console.log(context.params);
    const groupId = context.params['id']
let hasMemberAlreadyJoined =false;
    if(getAuthorizationHeaders(context)?.authorization){
       const memberDetails = await get(API_URLS.getGroupMemberDetails(groupId), {}, getAuthorizationHeaders(context));
       
       hasMemberAlreadyJoined = !!memberDetails?.id;
    }
    // const groupDetails = await get(API_URLS.groupsDetails(groupId), {}, getAuthorizationHeaders(context))
    // const expenses = await get(API_URLS.getExpenses(groupId), {}, getAuthorizationHeaders(context))
    // console.log("---------------",expenses);
  
    return {
      props: {
        groupId,
        hasMemberAlreadyJoined
        // groupDetails,
        // expenses
      }
    }
  }