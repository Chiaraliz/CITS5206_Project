import styled from "styled-components";
import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../components/Heading";

// Styled component for the layout of the 'Page Not Found' screen
const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50); // Light background
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

// Styled component for the box displaying the 404 message
const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 4.8rem;
  flex: 0 1 96rem; // Flex size of the box
  text-align: center;
  & h1 {
    margin-bottom: 3.2rem; // Margin below heading
  }
`;

// The PageNotFound component is displayed when a user navigates to a non-existent route.
function PageNotFound() {
  const moveBack = useMoveBack(); // Hook to navigate back in the browser history

  return (
    <StyledPageNotFound>
      <Box>
        {/* Heading for the 404 message */}
        <Heading as="h1">
          The page you are looking for could not be found 😢
        </Heading>

        {/* Button to navigate back to the previous page */}
        <button onClick={moveBack} size="large">
          &larr; Go back
        </button>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
