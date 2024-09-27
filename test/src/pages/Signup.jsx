import SignupForm from '../features/signup/SignupForm';
import Header from '../features/signup/Head';

const Signup = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      {/* Signup form section with an id for navigation */}
      <div id="signup-form" className="relative z-20 bg-gray-300 py-12 transform -translate-y-64"> {/* 添加 id */}
        <div className="bg-white mx-auto w-full max-w-4xl shadow-lg rounded-lg p-8">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
