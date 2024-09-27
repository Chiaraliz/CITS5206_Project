import { useState } from "react";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";

function InfoForm() {
  const [firstName, setFirstName] = useState("Liz");
  const [lastName, setLastName] = useState("Li");
  const [preferredName, setPreferredName] = useState("Liz");
  const [email, setEmail] = useState("liz@example.com");
  const [dateOfBirth, setDateOfBirth] = useState("2000-01-01");
  function handleClick() {
    setFirstName("Liz");
    setLastName("Li");
    setPreferredName("Liz");
    setEmail("liz@example.com");
    setDateOfBirth("2000-01-01");
  }
  return (
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
        <Button type="logout">Save Changes</Button>
        <Button type="primary" onClick={handleClick}>
          Reset
        </Button>
      </FormRow>
    </form>
  );
}

export default InfoForm;
