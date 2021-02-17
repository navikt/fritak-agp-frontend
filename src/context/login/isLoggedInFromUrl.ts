export const isLoggedInFromUrl = () => window.location.search.indexOf('loggedIn=true') > -1;

export default isLoggedInFromUrl;
