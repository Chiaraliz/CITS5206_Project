const BackgroundPanel = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {children}
    </div>
  );
}

export default BackgroundPanel;
