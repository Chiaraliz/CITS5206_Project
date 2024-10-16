import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiService from "../../services/apiService";

function WelcomeUser() {
  const { userId } = useParams(); // 从URL获取userId
  const [preferredName, setPreferredName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const userData = await apiService.fetchUserById(userId); // 获取用户信息
        setPreferredName(userData.preferred_name); // 设置preferred_name
        setFirstName(userData.first_name);
      } catch (err) {
        setError("Failed to load user data.");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserData(); // 获取用户数据
    }
  }, [userId]);

  // 渲染不同的状态
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="text-l font-medium">
      Welcome, {preferredName ? preferredName : firstName}.
    </div>
  );
}

export default WelcomeUser;
