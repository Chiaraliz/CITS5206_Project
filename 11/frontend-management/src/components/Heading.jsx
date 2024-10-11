// Heading.jsx
// A reusable styled component to display headings (h1, h2, h3).
// The styles change depending on the "as" prop (which determines the heading level).

import styled, { css } from "styled-components";

// Define styles based on the heading level (h1, h2, h3)
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem; // Large size for h1
      font-weight: 600; // Bold font
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem; // Medium size for h2
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem; // Smaller size for h3
      font-weight: 500;
    `}
    
  line-height: 1.4; // Adjust line height for readability
`;

export default Heading;
