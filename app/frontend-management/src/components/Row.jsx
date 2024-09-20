// Row.jsx
// This is a reusable layout component for flexbox rows.
// The type prop determines if the row is horizontal (default) or vertical.

import styled, { css } from "styled-components";

// Define the Row component, which can be horizontal or vertical
const Row = styled.div`
  display: flex; // Flexbox layout
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between; // Spread items horizontally
      align-items: center; // Vertically align items
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column; // Stack items vertically
      gap: 1.6rem; // Space between items
    `}
`;

// Default row type is vertical
Row.defaultProps = {
  type: "vertical",
};

export default Row;
