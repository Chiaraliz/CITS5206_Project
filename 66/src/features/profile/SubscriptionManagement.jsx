import { useEffect, useState } from "react";
import SubscriptionTable from "./SubscriptionTable";
import apiService from "../../services/apiService";

function SubscriptionManagement() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      apiService
        .fetchSubscriptionsByEmail(email)
        .then((data) => {
          setSubscriptions(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setError("No email found in localStorage");
      setLoading(false);
    }
  }, []);
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
      {subscriptions.length > 0 ? (
        subscriptions.map((subscription, index) => (
          <SubscriptionTable key={index} subscription={subscription} />
        ))
      ) : (
        <div>No subscriptions available.</div>
      )}
    </div>
  );
}

export default SubscriptionManagement;
