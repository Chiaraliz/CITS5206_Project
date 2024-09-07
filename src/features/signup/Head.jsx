const Header = () => {
  return (
    <div className="relative h-screen">  {/* 容器占满整个视口高度 */}
      {/* 固定背景图片 */}
      <img
        src="Kreator-Studios-AAYLF2019-158-1-2.webp"
        alt="Background"
        className="w-full h-full fixed top-0 left-0 z-0"
      />
      
      {/* 顶部固定白条 */}
      <div className="relative top-0 left-0 right-0 bg-white py-10 px-20 flex justify-between items-center z-10 shadow-md">
        <a href="https://aasyp.org/">
          <img
            src="cropped-AASYP-Logo-FC-Transparent-300x170.webp"
            alt="Logo"
            className="h-20 w-30"
          />
        </a>
        <div className="flex items-center">
          <span className="text-l font-medium">Having an account?</span>
          <button className="ml-4 bg-red-500 text-white text-l font-medium px-4 py-2 rounded hover:bg-red-600 transition duration-300">
            Sign In
          </button>
        </div>
      </div>

      {/* 显示背景图后的白色文字区域 */}
      <div className="absolute top-30 left-0 right-0 text-white pt-20 px-10 z-10 text-left">
        <h1 className="text-xl font-bold">Gain access to exclusive opportunities, resources,</h1>
        <h1 className="text-xl font-bold">discounted events, a dedicated newsletter and the</h1>
        <h1 className="text-xl font-bold">opportunity to tap into our wide networks with an AASYP Membership.</h1>

        {/* 按钮容器 */}
        <div className="flex mt-8 space-x-24">
          <a
            href="https://aasyp.org/sign-up/"
            className="border-4 border-white text-white px-4 py-2 hover:bg-white hover:text-black transition duration-300 text-l font-bold"
          >
            Learn More
          </a>

          {/* <button
            onClick={() => {
              document.getElementById('signup-form').scrollIntoView({ behavior: 'smooth' });  
            }}
            className="border-4 border-white text-white px-4 py-2 hover:bg-white hover:text-black transition duration-300 text-l font-bold"
          >
            Sign Up
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
