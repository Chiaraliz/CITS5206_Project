import SignupForm from '../features/signup/SignupForm';
import Header from '../features/signup/Header';

const Signup = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div id="signup-form" className="relative z-20 bg-gray-300 py-12 transform -translate-y-64">
        <div className="bg-white mx-auto w-full max-w-4xl shadow-lg rounded-lg p-8">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
