
export const API_URLS = {
    //auth
    login: "/auth/login",
    register: "/auth/register",
    getUserDetails : "auth/user-details",
    //groups
    groupsListing: "/grahsti/groups",
    createGroup: "/grahsti/group",
    groupsDetails: (id: string) => "/grahsti/group/" + id,
    // group categories
    groupCategories: (groupId: string) => "/grahsti/categories?groupId=" + groupId,
    //expenses
    addNewExpense: (groupId: string) => "/grahsti/expense/" + groupId,
    getExpenses: (groupId: string) => "/grahsti/expense/list/" + groupId,
    settleExpense: (expenseId: string) => "/grahsti/settle/expense/" + expenseId,
    unsettleExpense: (expenseId: string) => "/grahsti/unsettle/expense/" + expenseId,
    getExpenseDetail: (expenseId:string) =>  "/grahsti/expense/" + expenseId,
    updateExpense: (expenseId:string) =>  "/grahsti/expense/" + expenseId,
    deleteExpense: (expenseId:string) =>  "/grahsti/expense/" + expenseId,
    // Join group 
    joinGroup :(groupId: string) => `grahsti/group/${groupId}/join`,
    // group member details 
    getGroupMembers : (groupId: string) => `grahsti/group/${groupId}/members`,
    getGroupMemberDetails : (groupId: string) => `grahsti/group/${groupId}/member-details`,

}