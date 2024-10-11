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
