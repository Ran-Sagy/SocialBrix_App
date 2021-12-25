import React from "react";
import { Input } from "antd";

function SearchBox({ loading, placeholder, handleSearch, size = "large" }) {
  const { Search } = Input;
  return (
    <Search
      placeholder={placeholder}
      enterButton="Search"
      size={size}
      loading={loading}
      //   onPressEnter={handleSearch}
      onSearch={handleSearch}
    />
  );
}

export default SearchBox;
