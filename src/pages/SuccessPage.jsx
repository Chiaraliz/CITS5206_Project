import { useEffect, useState } from 'react';
import BackgroundPanel from '../features/signup/BackgroudPanel';
import MessageCard from '../features/signup/MessageCard';

function SuccessPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const customerId = urlParams.get('customer_id');
    if (customerId) {
      setSuccessMessage('Registration successful! Thank you for signing up.');
      setLoading(false);
    } else {
      setError('Missing customer ID from Chargebee.(Payment failed)');
      setLoading(false);
    }
  }, []);

  return (
    <BackgroundPanel>
      {loading ? (
        <p className="text-lg text-gray-700">Loading...</p>
      ) : error ? (
        <MessageCard 
          title="Error"
          message={error}
          detail=""
        />
      ) : (
        <MessageCard 
          title="Success!"
          message={successMessage}
          detail="Thank you for signing up. We hope you enjoy our services!"
        />
      )}
    </BackgroundPanel>
  );
}

export default SuccessPage;
