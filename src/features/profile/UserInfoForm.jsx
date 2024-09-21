import InfoForm from "./InfoForm";

function UserInfoForm() {
  return (
    <div className="mb-[5rem]">
      <div className="py-6 border-b-2">
        <h1 className="text-3xl font-semibold text-[#048492]">
          Personal Information
        </h1>
        <p className="mt-3">
          Check your personal information. Click{" "}
          <span className="font-semibold text-[#F5B559]">Save Changes</span> if
          you want to edit and save.
        </p>
      </div>
      <InfoForm />
    </div>
  );
}

export default UserInfoForm;
