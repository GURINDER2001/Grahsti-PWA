
export const API_URLS = {
    //auth
    login: "/auth/login",
    register: "/auth/register",
    //groups
    groupsListing: "/grahsti/groups",
    createGroup: "/grahsti/group",
    groupsDetails: (id: string) => "/grahsti/group/" + id,
    // group categories
    groupCategories: (groupId: string) => "/grahsti/categories?groupId=" + groupId,
    //expenses
    addNewExpense: (groupId: string) => "/grahsti/expense/" + groupId,
    getExpenses: (groupId: string) => "/grahsti/expenses/" + groupId,
    settleExpense: (expenseId: string) => "/grahsti/settle/expense/" + expenseId,
    unsettleExpense: (expenseId: string) => "/grahsti/unsettle/expense/" + expenseId,
    // Join group 
    joinGroup :(groupId: string) => `grahsti/group/${groupId}/join`,
    // group member details 
    getGroupMembers : (groupId: string) => `grahsti/group/${groupId}/members`,
    getGroupMemberDetails : (groupId: string) => `grahsti/group/${groupId}/member-details`,

}