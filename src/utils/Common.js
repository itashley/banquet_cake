// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem("user"); // Consistently using sessionStorage
  if (userStr) return JSON.parse(userStr);
  else return null;
};

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem("token") || null;
};

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};

// set the token and user from the session storage
export const setUserSession = (token, user) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
};

// get the user ID from the session storage
export const getUserID = () => {
  const userStr = sessionStorage.getItem("user"); // Consistently using sessionStorage
  if (userStr) {
    const user = JSON.parse(userStr); // Parse the JSON string to an object
    return user.id; // Return the id property
  }
  return null;
};

// get the user hotel ID from the session storage
export const getUserHotel = () => {
  const userStr = sessionStorage.getItem("user"); // Consistently using sessionStorage
  if (userStr) {
    const user = JSON.parse(userStr); // Parse the JSON string to an object
    return user.hotel_id; // Return the hotel_id property
  }
  return null;
};
