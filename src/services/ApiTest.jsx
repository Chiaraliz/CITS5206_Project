// ApiTest.jsx
import { useEffect } from "react";
import axios from "axios"; // Used for making API requests

const ApiTest = () => {
  // Simulating a POST request to the /register API when the component mounts
  useEffect(() => {
    const registerUser = async () => {
      try {
        // Data to be sent in the request body
        const userData = {
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@example.com",
          password: "securepassword123",
          date_of_birth: "01-01-1990", // Format: DD-MM-YYYY
        };

        // Sending POST request to the /register endpoint
        const response = await axios.post(
          "http://localhost:5000/api/register",
          userData
        );

        // Log the response from the server
        console.log("User registered successfully:", response.data);
      } catch (error) {
        // Log any errors during the request
        console.error("Error registering user:", error);
      }
    };

    registerUser(); // Calling the function to trigger the POST request
  }, []); // Empty dependency array, so it runs only once on component mount

  return <div>Check the console for API response.</div>;
};

export default ApiTest;
