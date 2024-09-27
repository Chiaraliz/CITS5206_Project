import { useCallback, useEffect, useState } from "react";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { useParams } from "react-router-dom";
import apiService from "../../services/apiService";

function InfoForm() {
  const { userId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // 使用useCallback来缓存fetchUserData函数的定义，避免在每次渲染时重新创建它
  const fetchUserData = useCallback(async () => {
    setIsLoading(true); // 设置加载状态为true
    setError(null); // 清除之前的错误

    try {
      const userData = await apiService.fetchUserById(userId); // 调用API获取用户数据
      setFirstName(userData.first_name);
      setLastName(userData.last_name);
      setPreferredName(userData.preferred_name);
      setEmail(userData.email);
      setDateOfBirth(userData.date_of_birth);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to load user data. Please try again later.");
    } finally {
      setIsLoading(false); // 数据加载完成
    }
  }, [userId]); // useCallback依赖userId

  // 在组件加载时获取数据
  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId, fetchUserData]);

  // 保存更改并调用update API
  async function handleSaveChanges(e) {
    e.preventDefault(); // 阻止表单默认提交
    setUpdateError(null); // 清除之前的错误
    setUpdateSuccess(false); // 重置更新成功状态

    if (!firstName) {
      setUpdateError("First Name is required.");
      return;
    }

    if (!lastName) {
      setUpdateError("Last Name is required.");
      return;
    }

    if (!preferredName) {
      setUpdateError("Preferred Name is required.");
      return;
    }

    if (!email) {
      setUpdateError("Email is required.");
      return;
    }

    if (!dateOfBirth) {
      setUpdateError("Date of Birth is required.");
      return;
    }
    setIsUpdating(true); // 开始更新，设置loading状态

    const updatedUserData = {
      first_name: firstName,
      last_name: lastName,
      preferred_name: preferredName,
      email: email,
      date_of_birth: dateOfBirth,
    };

    try {
      await apiService.updateUserById(userId, updatedUserData); // 调用API更新用户数据
      setUpdateSuccess(true); // 更新成功
      fetchUserData();
    } catch (error) {
      console.error("Error updating user data:", error);
      setUpdateError("Failed to update user data. Please try again later.");
    } finally {
      setIsUpdating(false); // 更新完成，重置loading状态
    }
  }

  // 重置并重新获取数据
  function handleReset() {
    if (userId) {
      fetchUserData(); // 重新发送请求获取用户数据
    }
  }
  const handleCloseSuccessMessage = () => {
    setUpdateSuccess(false);
  };
  const handleCloseErrorMessage = () => {
    setUpdateError(false);
  };
  return (
    <>
      {isLoading && (
        <div className="mt-7 text-stone-700 font-semibold ">Loading...</div>
      )}
      {error && (
        <div className="text-red-500 bg-red-200 pl-1 rounded-md mt-7">
          {error}
        </div>
      )}
      {updateSuccess && (
        <div className="text-green-500 bg-green-200 pl-1 rounded-md flex items-center">
          User updated successfully!
          <button
            type="button"
            className="ml-2 text-green-800 hover:text-green-900"
            onClick={handleCloseSuccessMessage}
          >
            Close
          </button>
        </div>
      )}
      {updateError && (
        <div className="text-red-500 bg-red-200 pl-1 rounded-md">
          {updateError}
          <button
            type="button"
            className="ml-2 text-green-800 hover:text-green-900"
            onClick={handleCloseErrorMessage}
          >
            Close
          </button>
        </div>
      )}
      {!error && !isLoading && (
        <form className="mt-8 w-2/3 flex flex-col  gap-8">
          <FormRow>
            <FormRow label="First Name" type="vertical">
              <input
                type="text"
                value={firstName}
                id="firstName"
                name="firstName"
                className="border rounded-full shadow h-9 outline-red-500 px-2"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormRow>
            <FormRow label="Last Name" type="vertical">
              <input
                type="text"
                value={lastName}
                id="lastName"
                name="lastName"
                className="border rounded-full shadow h-9 outline-red-500 px-2"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormRow>
          </FormRow>
          <FormRow>
            <FormRow label="Preferred Name" type="vertical">
              <input
                type="text"
                value={preferredName}
                id="preferredName"
                name="preferredName"
                className="border rounded-full shadow h-9 outline-red-500 px-2"
                required
                onChange={(e) => setPreferredName(e.target.value)}
              />
            </FormRow>
            <FormRow label="Email Address" type="vertical">
              <input
                type="email"
                value={email}
                id="email"
                name="email"
                className="border rounded-full shadow h-9 outline-red-500 px-2"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormRow>
          </FormRow>
          <FormRow>
            <FormRow label="Date of Birth" type="vertical">
              <input
                type="date"
                value={dateOfBirth}
                id="dateOfBirth"
                name="dateOfBirth"
                className="border rounded-full shadow h-9 outline-red-500 px-2 w-[21rem]"
                required
                min="1960-01-01"
                max="2025-12-31"
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </FormRow>
          </FormRow>

          <FormRow type="horizontal">
            <Button
              type="logout"
              onClick={handleSaveChanges}
              disabled={isUpdating}
            >
              Save Changes
            </Button>
            <Button type="primary" onClick={handleReset} disabled={isLoading}>
              Reset
            </Button>
          </FormRow>
        </form>
      )}
    </>
  );
}

export default InfoForm;
