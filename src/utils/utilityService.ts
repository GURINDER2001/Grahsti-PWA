export const getAuthorizationHeaders = (context?:any) => {
    let headers:any = {}
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
  
    const cookiePairs:any = {};
    rawCookieString.split(';').forEach((pair) => {
      const [key, value] = pair.trim().split('=');
      cookiePairs[key] = decodeURIComponent(value); // Decode URI-encoded values
    });
  
    return cookiePairs;
  }