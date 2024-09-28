const MessageCard = ({ title, message, detail }) => {
  return (
    <div className="p-10 bg-white rounded-lg shadow-xl max-w-sm w-full text-center flex flex-col items-center justify-center min-h-[24rem]">
      <img 
        src="cropped-AASYP-Logo-FC-Transparent-300x170.webp" 
        alt="AASYP Logo" 
        className="w-24 h-auto -mt-16 mb-10"  
      />
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-700 mb-2">{message}</p>
      <p className="text-sm text-gray-500">{detail}</p>
    </div>
  );
}

export default MessageCard;
