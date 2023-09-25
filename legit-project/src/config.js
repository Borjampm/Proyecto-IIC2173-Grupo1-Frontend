//const FRONT_PROXY = import.meta.env.PROXY;
const FRONT_PROXY = "https://www.borjampm.me";
const API_URL = "https://rpmvwdb78f.execute-api.us-east-2.amazonaws.com"

//Auth0 Config Params
const DOMAIN = "dev-ju2sb7gpzdrwv31f.us.auth0.com";
const CLIENT_ID = "Ss50jxHUP31QbXzYJHn2NHOiDP5CFrOP";
const REDIRECT_URI = `${FRONT_PROXY}/my-profile/`;
const SCOPE = "openid profile email logins_count";
const AUTH0_AUDIENCE = "https://dev-ju2sb7gpzdrwv31f.us.auth0.com/api/v2/";

export { FRONT_PROXY, API_URL, DOMAIN, CLIENT_ID, REDIRECT_URI, SCOPE, AUTH0_AUDIENCE };