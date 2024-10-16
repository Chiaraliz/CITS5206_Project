import { Input, Space } from "antd";
const { Search } = Input;
import PropTypes from "prop-types";

const SearchBar = ({ onSearch }) => (
  <Space direction="vertical">
    <Search
      placeholder="search a member"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
  </Space>
);

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
