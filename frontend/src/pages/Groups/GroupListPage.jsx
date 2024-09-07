import React, { useState } from "react";
import GroupList from "../../components/Groups/GroupList";
import GroupMakeButton from "../../components/Groups/GroupMakeButton";
import GroupsSearchForm from "../../components/Groups/GroupsSearchForm";

const GroupListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("createdAt"); // 기본 정렬 옵션 //createdAt ,likeCount

  // 검색어가 변경될 때 호출되는 함수
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // 정렬 옵션이 변경될 때 호출되는 함수
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  
  return (
    <>
      <GroupMakeButton />

      {/* 검색어와 정렬 옵션 변경 함수를 props로 전달 */}
      <GroupsSearchForm onSearch={handleSearch} onSortChange={handleSortChange} />

      {/* 그룹 리스트 컴포넌트에 검색어와 정렬 옵션을 props로 전달 */}
      <GroupList searchTerm={searchTerm} sortOption={sortOption} />
    </>
  );
};

export default GroupListPage;




