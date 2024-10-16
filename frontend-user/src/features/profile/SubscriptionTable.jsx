function SubscriptionTable({ subscription }) {
  const totalAmount = subscription.subscription_items.reduce(
    (acc, item) => acc + item.unit_price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col border-2 border-slate-100 rounded-md shadow-sm">
      <ul className="py-5 px-10 grid grid-cols-3 border-b">
        <li className="flex gap-2 flex-col text-sm">
          <div>Plan</div>
          <div className="font-semibold">
            {subscription.subscription_items[0].item_price_id}
          </div>
        </li>
        <li className="flex gap-2 flex-col text-sm">
          <div>Payment</div>
          <div>
            <span className="font-semibold">
              {subscription.currency_code} {totalAmount / 100}{" "}
            </span>
            per {subscription.billing_period_unit}
          </div>
        </li>
        <li className="flex gap-2 flex-col text-sm">
          <div>Status</div>
          <div className="font-semibold">{subscription.status}</div>
        </li>
      </ul>
      <ul className="py-5 px-10 grid grid-cols-3">
        <li className="flex gap-2 flex-col text-sm">
          <div>Start Date</div>
          <div className="font-semibold">{subscription.started_at}</div>
        </li>
        <li className="flex gap-2 flex-col text-sm">
          <div>Renewal Date</div>
          <div className="font-semibold">{subscription.current_term_end}</div>
        </li>
        <li className="flex items-center text-sm">
          <button className="bg-stone-100 text-stone-600 font-semibold text-sm rounded-lg px-6 py-2 hover:opacity-70 ease-in duration-300">
            <a
              href="https://aasyp-test.chargebeeportal.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Manage Subscription
            </a>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SubscriptionTable;
