// SearchBar.jsx
// This component renders a search bar using Ant Design (antd).
// The onSearch function handles the search logic and logs the result to the console.

import { Input, Space } from "antd";
const { Search } = Input;
import PropTypes from "prop-types";

const SearchBar = ({ onSearch }) => (
  <Space direction="vertical">
    <Search
      placeholder="search a member" // Placeholder text for search input
      allowClear // Allows clearing the search input
      enterButton="Search" // Label for the search button
      size="large" // Size of the search input
      onSearch={onSearch} // Handler for the search action
    />
  </Space>
);

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
