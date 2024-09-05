import { Input, Space } from "antd";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);
const SearchBar = () => (
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
export default SearchBar;
