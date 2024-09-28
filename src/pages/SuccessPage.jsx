import { useState } from 'react';
import BackgroundPanel from '../features/signup/BackgroudPanel';
import MessageCard from '../features/signup/MessageCard';

function SuccessPage() {
  const [successMessage] = useState("Welcome to join us!");

  return (
    <BackgroundPanel>
      <MessageCard 
        title="Success!"
        message={successMessage}
        detail="Thank you for signing up. We hope you enjoy our services!"
      />
    </BackgroundPanel>
  );
}

export default SuccessPage;
