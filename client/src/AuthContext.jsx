import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //for state management
  const [isLoggedIN, setIsLoggedIn] = useState(() => {
    // Get the login status from local storage, default to false if not present
    const storedIsLoggedIn = localStorage.getItem('isLoggedIN');
    return storedIsLoggedIn === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIN', isLoggedIN.toString());
  }, [isLoggedIN]);

  const [userDetails, setUserDetails] = useState({});

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/me", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      const userDetails = response.data.user;
      setUserDetails(userDetails); // Set the user profile details in the state variable
      return userDetails;
    } catch (error) {
      console.error("Error object:", error);
      // Check for network errors
      if (error.message === "Network Error") {
        alert("Network error occurred. Please check your internet connection.");
      } else if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred. Please try again later.");
      }
      console.error("Failed to fetch user profile details:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIN, setIsLoggedIn, userDetails, fetchUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;