// Logo.jsx
// This component displays the logo image of the application.
// The logo is centrally aligned within its container.

import styled from "styled-components";

// Styled component for the logo container
const StyledLogo = styled.div`
  text-align: center; // Center align the logo
`;

// Styled component for the logo image
const Img = styled.img`
  height: 9.6rem; // Set the height of the logo
  width: auto; // Maintain the aspect ratio of the image
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo-light.png" alt="Logo" /> {/* Source of the logo image */}
    </StyledLogo>
  );
}

export default Logo;
