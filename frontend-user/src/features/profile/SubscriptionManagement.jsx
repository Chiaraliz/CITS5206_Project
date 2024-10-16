import { useEffect, useState } from "react";
import SubscriptionTable from "./SubscriptionTable";
import apiService from "../../services/apiService";
import { useParams } from "react-router-dom";

function SubscriptionManagement() {
  const { userId } = useParams(); // 从 URL 中获取 userId 参数
  const [loading, setLoading] = useState(true); // 控制加载状态
  const [error, setError] = useState(null); // 控制错误状态
  const [subscription, setSubscription] = useState(null); // 存储订阅数据

  // Function to fetch subscription data using getSubscriptionByUserId
  const fetchSubscriptionData = async (userId) => {
    try {
      const subscriptionData = await apiService.getSubscriptionByUserId(userId);

      // 检查是否返回了订阅信息
      if (subscriptionData.error) {
        setError(subscriptionData.error);
      } else {
        setSubscription(subscriptionData); // 将订阅信息存储在状态中
        console.log(subscription);
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  // useEffect 钩子在组件挂载时调用 API
  useEffect(() => {
    if (userId) {
      fetchSubscriptionData(userId); // 根据 userId 获取订阅信息
    }
  }, [userId]); // 依赖 userId，确保在 userId 变化时重新调用

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mb-10">
      <div className="py-6 mb-10  border-b-2">
        <h1 className="text-3xl font-semibold text-[#048492]">
          Subscription Management
        </h1>
        <p className="mt-3">Manage your subscription in the portal.</p>
      </div>

      <SubscriptionTable subscription={subscription} />
    </div>
  );
}

export default SubscriptionManagement;
