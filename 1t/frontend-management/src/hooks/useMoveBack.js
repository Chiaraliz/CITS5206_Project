import { useNavigate } from "react-router-dom";

// This hook provides a function to navigate one step back in the browser's history.
// It uses the useNavigate hook from react-router-dom to control navigation within the app.
export function useMoveBack() {
  const navigate = useNavigate(); // useNavigate hook allows programmatic navigation
  return () => navigate(-1); // navigate(-1) moves the user back to the previous page
}
