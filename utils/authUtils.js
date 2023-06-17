export const saveAuthToken = token => {
    localStorage.setItem("sunrise_user", token);
  };
  
  export const getAuthToken = () => {
    return localStorage.getItem("sunrise_user");
  };
  
  export const clearAuthToken = () => {
    localStorage.removeItem("sunrise_user");
  };
  
  export const getAuthHeader = () => {
    const accessToken = localStorage.getItem("sunrise_user");
    return { authorization: accessToken };
  };
  
  export const getApplicationJsonHeader = () => ({
    "Content-Type": "application/json"
  });