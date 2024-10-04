import { useState } from 'react';
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";

function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("2000-01-01");
  const [membershipType, setMembershipType] = useState("");
  const [agree, setAgree] = useState(false);

  const chargebee = window.Chargebee.init({
    site: "aasyp-test"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !membershipType || !password || !agree) {
      alert("Please fill out all required fields and agree to the terms.");
      return;
    }

    try {
      const result = await chargebee.customer.create({
        email: email,
        firstName: firstName,
        lastName: lastName
      }).request();

      const customerId = result.customer.id;
      console.log("Chargebee customer ID: ", customerId);

      // 这里可以添加其他处理逻辑，例如将数据发送到你的后端服务器
    } catch (error) {
      console.error("Chargebee error: ", error);
      alert("An error occurred while creating the customer on Chargebee: " + (error.message || "Check console for more details."));
    }
  };

  return (
    <div className="bg-white py-6 px-8">
      <div className="mb-4">
        <p className="text-xl font-bold text-gray-400 mb-6">Please fill out this form to complete the sign up.</p>
        <h1 className="text-2xl font-bold text-gray-900">Membership Sign Up</h1>
      </div>
      <form className="mt-8 w-full md:w-2/3 flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* 表单字段 */}
        <FormRow label="First Name" type="vertical">
          <input type="text" value={firstName} id="firstName" name="firstName"
            className="border rounded-full shadow h-9 outline-red-500 px-2 w-full md:w-auto" required
            onChange={(e) => setFirstName(e.target.value)} />
        </FormRow>
        <FormRow label="Last Name" type="vertical">
          <input type="text" value={lastName} id="lastName" name="lastName"
            className="border rounded-full shadow h-9 outline-red-500 px-2 w-full md:w-auto" required
            onChange={(e) => setLastName(e.target.value)} />
        </FormRow>
        <FormRow label="Preferred Name" type="vertical">
          <input type="text" value={preferredName} id="preferredName" name="preferredName"
            className="border rounded-full shadow h-9 outline-red-500 px-2 w-full md:w-auto" required
            onChange={(e) => setPreferredName(e.target.value)} />
        </FormRow>
        <FormRow label="Email Address" type="vertical">
          <input type="email" value={email} id="email" name="email"
            className="border rounded-full shadow h-9 outline-red-500 px-2 w-full md:w-auto" required
            onChange={(e) => setEmail(e.target.value)} />
        </FormRow>
        <FormRow label="Password" type="vertical">
          <input
            type="password"
            value={password}
            id="password"
            name="password"
            className="border rounded-full shadow h-9 outline-red-500 px-2 w-full md:w-auto"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormRow>

        <FormRow label="Date of Birth" type="vertical">
          <input
            type="date"
            value={dateOfBirth}
            id="dateOfBirth"
            name="dateOfBirth"
            className="border rounded-full shadow h-9 outline-red-500 px-2 w-full md:w-auto"  // 确保使用相同的 className
            required
            min="1960-01-01"
            max="2025-12-31"
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </FormRow>

        <FormRow label="What do you hope to get and contribute through your membership? (Optional)" type="vertical">
          <textarea
            id="membershipGoals"
            name="membershipGoals"
            className="border rounded shadow h-24 outline-red-500 px-2 w-full"
            placeholder="Your goals and contributions"
          />
        </FormRow>
        <FormRow label="How did you first hear about us?" type="vertical">
          <select
            id="referralSource"
            name="referralSource"
            className="border rounded-full shadow h-9 outline-red-500 px-2 w-full md:w-auto"
            required
          >
            <option value="">Select source</option>
            <option value="Facebook">Facebook</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Website">Website</option>
            <option value="University">University</option>
            <option value="Conference">Conference</option>
            <option value="Article">Article</option>
            <option value="Word of mouth">Word of mouth from a friend or colleague</option>
          </select>
        </FormRow>
        <FormRow label="Membership Type" type="vertical">
          <select
            value={membershipType}
            onChange={(e) => setMembershipType(e.target.value)}
            className="border rounded-full shadow h-9 outline-red-500 px-2 w-full md:w-auto"
            required
          >
            <option value="">Select Membership Type</option>
            <option value="Australian Student">Australian Student ($20AUD/year) - For students enrolled full-time.</option>
            <option value="Australian Young Professional">Australian Young Professional ($30AUD/year) - For employed professionals.</option>
            <option value="ASEAN Student">ASEAN Student ($10AUD/year) - For students in ASEAN region.</option>
            <option value="ASEAN Young Professional">ASEAN Young Professional ($15AUD/year) - For professionals in ASEAN region.</option>
          </select>
        </FormRow>
        <FormRow>
          <label className="flex items-start space-x-5">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)}
              className="form-checkbox h-12 w-12 text-red-600 rounded-full mt-1" />
            <span className="mt-4 text-base leading-snug">
              I declare and agree to the terms and conditions stipulated in the following documents and policies available at
              <a href="https://aasyp.org/aasyp-policies" target="_blank" rel="noopener noreferrer"
                className="text-red-500 underline">aasyp.org/aasyp-policies</a>: AASYP Constitution, Code of Conduct, Membership Terms, Privacy Policy, and Child Protection Policy.
            </span>
          </label>
        </FormRow>
        <FormRow type="horizontal">
          <Button type="primary" className="ml-4 bg-red-500 text-white text-l font-medium px-4 py-2 rounded hover:bg-red-600 transition duration-300">Submit</Button>
        </FormRow>
      </form>
    </div>
  );
}

export default SignupForm;
