import SubscriptionTable from "./SubscriptionTable";

function SubscriptionManagement() {
  return (
    <div className="mb-10">
      <div className="py-6 mb-10  border-b-2">
        <h1 className="text-3xl font-semibold text-[#048492]">
          Subscription Management
        </h1>
        <p className="mt-3">Manage your subscription in the portal.</p>
      </div>
      <SubscriptionTable />
    </div>
  );
}

export default SubscriptionManagement;
