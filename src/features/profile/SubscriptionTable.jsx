import Button from "../../ui/Button";

function SubscriptionTable() {
  return (
    <div className="flex flex-col border-2 border-slate-100 rounded-md shadow-sm">
      <ul className="py-5 px-10 grid  grid-cols-3 border-b">
        <li className="flex gap-2 flex-col text-sm">
          <div>Plan</div>
          <div className="font-semibold">Australian Student</div>
        </li>
        <li className="flex gap-2 flex-col text-sm">
          <div>Payment</div>
          <div>
            <span className="font-semibold">AUD 20 </span>per year
          </div>
        </li>
        <li className="flex gap-2 flex-col text-sm">
          <div>Status</div>
          <div className="font-semibold">Active</div>
        </li>
      </ul>
      <ul className="py-5 px-10 grid  grid-cols-3">
        <li className="flex gap-2 flex-col text-sm">
          <div>Start Date</div>
          <div className="font-semibold">16/09/2024</div>
        </li>
        <li className="flex gap-2 flex-col text-sm">
          <div>Renewal Date</div>
          <div className="font-semibold">15/09/2025</div>
        </li>
        <li className="flex items-center text-sm">
          <Button type={"primary"}>Cancel Subscription</Button>
        </li>
      </ul>
    </div>
  );
}

export default SubscriptionTable;
