export const getAuthorizationHeaders = (context?: any) => {
  let headers: any = {}
  if (context) {
    const token = context?.req?.cookies["token"]
    headers["authorization"] = "Bearer " + token;
    return headers;
  }
  const token = getCookiePairs()['token']
  if (token)
    headers["authorization"] = "Bearer " + token;
  return headers;
}
function getCookiePairs() {
  const rawCookieString = document.cookie;
  if (!rawCookieString) return {};

  const cookiePairs: any = {};
  rawCookieString.split(';').forEach((pair) => {
    const [key, value] = pair.trim().split('=');
    cookiePairs[key] = decodeURIComponent(value); // Decode URI-encoded values
  });

  return cookiePairs;
}

export const getUserDetails = () => {
  return JSON.parse(window?.localStorage.getItem("user") || "");
}

export function getDateAndMonthName(date: any) {
  const dateformat = new Date(date);
  const day = dateformat.getDate();
  const monthNumber = dateformat.getMonth() + 1;
  const monthName: any = {
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

  return { day, month: monthName[monthNumber] }
}