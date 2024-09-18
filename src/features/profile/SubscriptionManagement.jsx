import Button from "../../ui/Button";

function SubscriptionManagement() {
  return (
    <div className="my-10">
      <div className="py-6 mb-10 ">
        <h1 className="text-3xl font-semibold text-[#048492]">
          Subscription Management
        </h1>
        <p className="mt-3">Manage your subscription in the portal.</p>
      </div>
      <div className="w-[400px] flex justify-center shadow-lg mb-7">
        <img src="/portal.png" alt="portal"></img>
      </div>
      <Button type="logout">
        {" "}
        <a href="https://aasyp-test.chargebeeportal.com">Access Portal</a>
      </Button>
    </div>
  );
}

export default SubscriptionManagement;
