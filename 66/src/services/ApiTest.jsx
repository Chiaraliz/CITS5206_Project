// ApiTest.jsx
// import { useEffect } from "react";
// import axios from "axios"; // Used for making API requests

// const ApiTest = () => {
//   // Simulating a POST request to the /register API when the component mounts
//   useEffect(() => {
//     const registerUser = async () => {
//       try {
//         // Data to be sent in the request body
//         const userData = {
//           first_name: "John",
//           last_name: "Doe",
//           email: "johndoe@example.com",
//           password: "securepassword123",
//           date_of_birth: "01-01-1990",
//           preferred_name: "1",
//           comment: "1",
//           hear: "1",
//           membership_type: "1", // Format: DD-MM-YYYY
//         };

//         // Sending POST request to the /register endpoint
//         const response = await axios.post(
//           "http://localhost:5000/api/register",
//           userData
//         );

//         // Log the response from the server
//         console.log("User registered successfully:", response.data);
//       } catch (error) {
//         // Log any errors during the request
//         console.error("Error registering user:", error);
//       }
//     };

//     registerUser(); // Calling the function to trigger the POST request
//   }, []); // Empty dependency array, so it runs only once on component mount

//   return <div>Check the console for API response.</div>;
// };

// export default ApiTest;

// ApiTest.jsx
import { useEffect } from "react";
import axios from "axios"; // 用于发起 API 请求

const ApiTest = () => {
  // 在组件挂载时发起 API 请求
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 发送 GET 请求到后端 API
        const response = await axios.get("http://localhost:5000/api/members");
        // 打印获取到的数据到 console
        console.log("Fetched data from API:", response.data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData(); // 调用 fetchData 函数
  }, []); // 空依赖数组，表示该副作用只会在组件第一次渲染时执行

  return <div>Check the console for API data.</div>;
};

export default ApiTest;
