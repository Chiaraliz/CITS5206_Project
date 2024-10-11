import { useNavigate } from 'react-router-dom';

const MessageCard = ({ title, message, userId }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // 跳转到指定的userProfile页面，假设你传递了userId作为参数
    navigate(`/userProfile/${userId}`);
  };

  return (
    <div className="p-10 bg-white rounded-lg shadow-xl max-w-sm w-full text-center flex flex-col items-center justify-center min-h-[24rem]">
      <img 
        src="cropped-AASYP-Logo-FC-Transparent-300x170.webp" 
        alt="AASYP Logo" 
        className="w-24 h-auto -mt-16 mb-10"  
      />
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-700 mb-2">{message}</p>
      <button
        onClick={handleNavigate}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
      >
        Go to Profile
      </button>
    </div>
  );
}

export default MessageCard;
