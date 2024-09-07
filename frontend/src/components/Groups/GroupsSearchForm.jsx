import React, { useState ,useEffect} from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const GroupsSearchForm = ({ onSearch, onSortChange }) => {  
  const [inputValue, setInputValue] = useState(''); // 검색어 상태
  const [sortOption, setSortOption] = useState(''); // 정렬 옵션 상태
  const location = useLocation();
  const [debounceTimeout, setDebounceTimeout] = useState(null); // 디바운스 타이머 상태


  useEffect(()=>{
    const cachedData = sessionStorage.getItem('groupsData');   
    if (cachedData) {
      sessionStorage.getItem('keyword');
      setInputValue(sessionStorage.getItem('keyword'));
      setSortOption(sessionStorage.getItem('sortBy'));
    }
  }, []);



  // 검색어 입력 시 호출되는 함수
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // 상태 업데이트

    //이전 타이머를 클리어하고 새로운 타이머 설정
    if(debounceTimeout){
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      onSearch(value); // 디바운스 후 검색 실행
    }, 300);
    
    setDebounceTimeout(timeout); //타이머 상태 업데이트
  };

  
  // 엔터 키를 눌렀을 때 검색 실행
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout); // 엔터 키로 검색 시 타이머 클리어
      }
      onSearch(inputValue); // 즉시 검색 실행
    }
  };



  // 정렬 옵션이 변경될 때 호출되는 함수
  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption); // 상태 업데이트
    onSortChange(selectedOption); // 상위 컴포넌트에 정렬 옵션 전달
  };



  return (
    <div className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto pb-10 pt-10">
      
      <div className="flex  flex-col  
        lg:flex-row justify-between items-center bg-white mb-5  ">
       
        <div className="flex flex-wrap items-center mb-3  lg:w-[150px]  ">
          <Link className={`px-4 py-2 rounded-3xl 
            ${(location.pathname === '/' || location.pathname === '/groups' || location.pathname === '/groups/releaseGroup') ? 'bg-black text-white ' : 'text-black'}`} 
            to={'/groups/releaseGroup'}>
            공개
          </Link>
          <Link className={`px-4 py-2 rounded-3xl 
            ${location.pathname === '/groups/privateGroup' ? 'bg-black text-white' : 'text-black'}`} 
            to={'/groups/privateGroup'}>
            비공개
          </Link>
        </div>
      

        <div className="relative flex-grow md:mx-4  mx-4 mb-5 w-[80%]   ">
          {/* 검색 아이콘, 입력값이 없을 때 표시 */}
          {!inputValue && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img src="/images/zoom.svg" alt="Search Icon" className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress} // 엔터 키 이벤트 추가
            placeholder="   그룹명을 검색해 주세요"
            className="w-full pl-10 px-4 py-2 border rounded-md bg-gray-50"
          />
        </div>



        <div className="mb-5 w-[80%] lg:w-[200px]  ">
          <div className="relative inline-block w-full ">
            {/* 정렬 옵션 선택 */}
            <select 
              className="w-full px-5 py-2 border border-black text-black rounded-md text-left appearance-none pr-10"
              value={sortOption}
              onChange={handleSortChange} // 정렬 옵션 변경 시 이벤트 처리
            >
              <option value="createdAt">최신순</option>
              <option value="likeCount">공감순</option>              
              <option value="postCount">게시글순</option>
              <option value="badgeCount">배지순</option>
            </select>
            
            {/* 커스텀 화살표 아이콘 */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <img src="/images/arrow-bottom.svg" alt="Arrow Icon" className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupsSearchForm;
