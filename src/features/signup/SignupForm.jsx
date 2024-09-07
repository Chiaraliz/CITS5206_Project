import { useState } from 'react';
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";

function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("2000-01-01");
  const [howHeard, setHowHeard] = useState("");
  const [agree, setAgree] = useState(false);

  return (
    <form className="mt-8 w-2/3 flex flex-col gap-8">
        
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
      <FormRow>
        <FormRow label="How did you first hear about us?" type="vertical">
          <select
            value={howHeard}
            id="howHeard"
            name="howHeard"
            className="border rounded-full shadow h-9 outline-red-500 px-2"
            required
            onChange={(e) => setHowHeard(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="social_media">Social Media</option>
            <option value="friend">Friend</option>
            <option value="advertisement">Advertisement</option>
            <option value="other">Other</option>
          </select>
        </FormRow>
      </FormRow>
      <FormRow>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="form-checkbox h-5 w-5 text-red-600"
          />
          <span>
            I declare and agree to the terms and conditions stipulated in the following documents and policies available at <a href="https://aasyp.org/aasyp-policies" target="_blank" rel="noopener noreferrer" className="text-red-500 underline">aasyp.org/aasyp-policies</a>: AASYP Constitution, Code of Conduct, Membership Terms, Privacy Policy, and Child Protection Policy.
          </span>
        </label>
      </FormRow>
      <FormRow type="horizontal">
        <Button className="ml-4 bg-red-500 text-white text-l font-medium px-4 py-2 rounded hover:bg-red-600 transition duration-300">Submit</Button>
      </FormRow>
    </form>
  );
}

export default SignupForm;
