import styled from "styled-components";

// Styled component for layout of the login page
const LoginLayout = styled.main`
  min-height: 100vh; // Full viewport height
  display: grid;
  grid-template-columns: 48rem; // Set the column width for the login form
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50); // Background color for the login page
`;

// The Login component renders the layout for the user login page.
function Login() {
  return <LoginLayout>Login</LoginLayout>; // Placeholder for login form content
}

export default Login;
