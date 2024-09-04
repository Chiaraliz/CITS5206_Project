function Logo() {
  // 将图片路径固定为 public 文件夹中的 Logo.png
  const src = "Logo.png";

  return (
    <div className="text-center">
      <img className="h-24 w-auto" src={src} alt="Logo" />
    </div>
  );
}

export default Logo;
