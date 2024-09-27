import { useState } from "react";
import CustomModal from "../../ui/Modal";

function SubscriptionTable() {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };
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
          <button
            className="bg-stone-100 text-stone-600 font-semibold text-sm rounded-lg px-6 py-2 hover:opacity-70 ease-in duration-300"
            onClick={showModal}
          >
            Cancel Subscription
          </button>
        </li>
      </ul>
      <CustomModal open={open} hideModal={hideModal} />
    </div>
  );
}

export default SubscriptionTable;
