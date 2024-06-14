export const getLocalStorage = (payload: string) => {
    if (typeof window !== "undefined") {
      const response = localStorage.getItem(payload);
      return response;
    }
  };
  
  export const setLocalStorage = (keyname: string, payload: {}) => {
    const response = localStorage.setItem(keyname, JSON.stringify(payload));
    return response;
  };
  
  export const removeLocalStorage = (keyname: string) => {
    const response = localStorage.removeItem(keyname);
    return response;
  };
  