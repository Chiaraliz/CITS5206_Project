import Heading from "../components/Heading";
import Row from "../components/Row";

// The Account component renders the UI for updating user account details.
// It contains sections for updating user data and password.
function Account() {
  return (
    <>
      {/* Main heading for the account update page */}
      <Heading as="h1">Update your account</Heading>

      {/* Section for updating user data */}
      <Row>
        <Heading as="h3">Update user data</Heading>
        <p>Update user data form</p>
      </Row>

      {/* Section for updating the user password */}
      <Row>
        <Heading as="h3">Update password</Heading>
        <p>Update user password form</p>
      </Row>
    </>
  );
}

export default Account;
