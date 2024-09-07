import React, { useState } from "react";
import { Link } from "react-router-dom";

const PostsSearchForm = ({ isPublic, handleIsPublic, setKeyword, setSortBy, keyword }) => {
  const [debounceTimeout, setDebounceTimeout] = useState(null); // 디바운스 타이머 상태

  // 검색어 입력 처리 (디바운스 적용)
  const handleInputChange = (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      setKeyword(value);
    }, 300);

    setDebounceTimeout(timeout);
  };

  // 엔터 키를 눌렀을 때 검색어 처리
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      setKeyword(keyword);
    }
  };

  return (
    <div className="w-full mx-auto mb-10 mt-5">
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white mb-10">
        <div className="flex mb-5 lg:w-[150px] items-center">
          <Link
            className={`px-4 py-2 rounded-3xl ${isPublic ? "bg-black text-white" : "text-black"}`}
            onClick={() => handleIsPublic(true)}
          >
            공개
          </Link>
          <Link
            className={`px-4 py-2 rounded-3xl ${!isPublic ? "bg-black text-white" : "text-black"}`}
            onClick={() => handleIsPublic(false)}
          >
            비공개
          </Link>
        </div>

        <div className="relative mb-5 w-[80%] lg:w-[80%] flex-grow mx-4">
          {!keyword && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img
                src="/images/zoom.svg"
                alt="Search Icon"
                className="h-5 w-5 text-gray-400"
              />
            </div>
          )}
          <input
            type="text"
            value={keyword}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="태그 혹은 제목을 입력해 주세요"
            className="w-full pl-10 px-4 py-2 border rounded-md bg-gray-50"
          />
        </div>

        <div className="w-[80%] lg:w-[200px]">
          <div className="relative mb-5 inline-block w-full">
            <select
              className="w-full px-5 py-2 border border-black text-black rounded-md text-left appearance-none pr-10"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="likeCount">공감순</option>
              <option value="createdAt">최신순</option>
              <option value="commentCount">댓글순</option>
              <option value="moment">추억의 순간순</option>
            </select>

            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <img
                src="/images/arrow-bottom.svg"
                alt="Arrow Icon"
                className="h-5 w-5 text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsSearchForm;
