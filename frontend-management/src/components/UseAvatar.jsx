function UserAvatar() {
  return (
    <div className="flex items-center gap-3 font-medium text-gray-600">
      <img
        className="w-14 h-14 rounded-full object-cover object-center border-2 border-gray-100"
        src={"default-user.jpg"}
        alt="Zane Wen"
      />
      <span>Zane Wen</span>
    </div>
  );
}

export default UserAvatar;
