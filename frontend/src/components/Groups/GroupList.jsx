import React, { useEffect, useState } from 'react';
import ReleaseGroupCard from './ReleaseGroupCard';
import PrivateGroupCard from './PrivateGroupCard';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../api-config';

const GroupList = ({ searchTerm, sortOption }) => {
  const [groups, setGroups] = useState([]); // 그룹 목록 상태
  const [isPublic, setIsPublic] = useState(true); // 공개 여부 상태
  const [groupType, setGroupType] = useState("release"); // 그룹 유형 상태
  const [page, setPage] = useState(1); // 페이지 번호 상태
  const [pageSize, setPageSize] = useState(8); // 페이지 크기 상태
  const [totalItemCount, setTotalItemCount] = useState(0); // 총 항목 수 상태
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수 상태
  const [fetchDataIng, setFetchDataIng] = useState(false); // 데이터 로딩 상태
  const [keyword, setKeyword] = useState(searchTerm); // 검색어 상태
  const [sortBy, setSortBy] = useState(sortOption || "createdAt"); // 정렬 옵션 상태
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  // 그룹 데이터를 API로부터 가져오는 함수
  const fetchGroups = async (isPublicStatus, pageStatus, pageSizeStatus, searchTerm, sortOption) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/groups?isPublic=${isPublicStatus}&page=${pageStatus}&pageSize=${pageSizeStatus}&keyword=${searchTerm}&sortBy=${sortOption}`
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error("데이터 가져오기 오류");
      }
      setGroups(responseData.data); // 그룹 목록 설정
      setTotalItemCount(responseData.totalItemCount); // 총 항목 수 설정
      setTotalPages(responseData.totalPages); // 총 페이지 수 설정
   
    } catch (error) {
      console.error("fetchGroups error:", error);
    }
  };

  useEffect(() => {
    const cachedData = sessionStorage.getItem('groupsData');
   
    if (cachedData) {
       // 캐시된 데이터가 있는 경우 이를 사용
       //console.log("캐시된 데이터가 있는 경우 이를 사용",cachedData);
       setGroups(JSON.parse(cachedData));
       setGroupType(sessionStorage.getItem('groupType'));
       setPage(parseInt(sessionStorage.getItem('page')));
       setPageSize(sessionStorage.getItem('pageSize'));
       setKeyword(sessionStorage.getItem('keyword'));
       setSortBy(sessionStorage.getItem('sortBy'));
       setIsPublic(sessionStorage.getItem('isPublic'));
       setTotalItemCount(parseInt(sessionStorage.getItem('totalItemCount')));
       setTotalPages(parseInt(sessionStorage.getItem('totalPages')));

       setTimeout(() => {
        sessionStorage.removeItem('groupsData');  
        sessionStorage.removeItem('groupType');
        sessionStorage.removeItem('page');
        sessionStorage.removeItem('pageSize');
        sessionStorage.removeItem('keyword');
        sessionStorage.removeItem('sortBy');
        sessionStorage.removeItem('isPublic');
        sessionStorage.removeItem('totalItemCount');
        sessionStorage.removeItem('totalPages');
       }, 100);
       
    } else {
      // 페이지 로드 시 그룹 데이터를 가져오는 효과
      let isPublicStatus = true;
      if (pathname === "/groups/privateGroup") {
        isPublicStatus = false;
        setGroupType("private");
      } else {
        setGroupType("release");
      }
      setIsPublic(isPublicStatus);
      setPage(1);
      setPageSize(8);
      setKeyword(searchTerm);
      setSortBy(sortOption);
      fetchGroups(isPublicStatus, 1, 8, searchTerm, sortOption);
    }
  }, [pathname, searchTerm, sortOption, location]);

  // 더보기 버튼 클릭 시 추가 그룹 데이터를 가져오는 함수
  const groupsMore = async () => {
    try {
      setFetchDataIng(true); // 로딩 상태 설정
      const currentPage = page + 1; // 다음 페이지 번호 계산
      const response = await fetch(
        `${API_BASE_URL}/api/groups?isPublic=${isPublic}&page=${currentPage}&pageSize=${pageSize}&keyword=${keyword}&sortBy=${sortBy}`
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error("그룹 더보기 오류");
      }
      setGroups((prevGroups) => [...prevGroups, ...responseData.data]); // 기존 그룹 목록에 추가
      setPage(currentPage); // 현재 페이지 설정
      setTotalItemCount(responseData.totalItemCount); // 총 항목 수 업데이트
      setTotalPages(responseData.totalPages); // 총 페이지 수 업데이트
      
  
    } catch (error) {
      console.error("groupsMore error:", error);
    } finally {
      setFetchDataIng(false); // 로딩 상태 해제
    }
  };




  const moveGroupsDetailHandler = (url) => {
    sessionStorage.setItem('groupsData', JSON.stringify(groups));
    sessionStorage.setItem('groupType', groupType);
    sessionStorage.setItem('page', page);
    sessionStorage.setItem('pageSize', pageSize);
    sessionStorage.setItem('keyword', keyword);
    sessionStorage.setItem('sortBy', sortBy);
    sessionStorage.setItem('isPublic', isPublic);
    sessionStorage.setItem('totalItemCount', totalItemCount);
    sessionStorage.setItem('totalPages', totalPages);
    navigate(url);
  };

  return (
    <>
      {groups && groups.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-28">
            {groups.map((group) =>
              groupType === "release" ? (
                <ReleaseGroupCard key={group.id} group={group} moveGroupsDetailHandler= {moveGroupsDetailHandler} />
              ) : (
                <PrivateGroupCard key={group.id} group={group} moveGroupsDetailHandler={moveGroupsDetailHandler} />
              )
            )}
          </div>

          {!fetchDataIng && groups.length < totalItemCount && (
            <div className="mb-5">
              <button
                className="w-full bg-gray-0 text-black py-3 rounded-md border border-black hover:bg-black hover:text-white"
                onClick={groupsMore}
              >
                더보기
              </button>
            </div>
          )}

          {fetchDataIng && (
            <div className="flex justify-center">
              <div className="loader">데이터 가져오는 중...</div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center flex justify-center w-full h-screen items-center">
          <div>
            <div className="flex justify-center mb-3">
              <img src="/images/NodataGroup.svg" alt="No Data" />
            </div>
            <h2 className="text-2xl font-bold text-gray-400 mt-5">
              등록된 공개 그룹이 없습니다.
            </h2>
            <p className="text-gray-400 mt-3">
              가장 먼저 그룹을 만들어보세요!
            </p>
            <div className="flex justify-center mt-36">
              <button
                onClick={() => navigate('/groups/create')}
                className="w-96 h-12 bg-gray-950 text-white font-bold rounded-md hover:bg-gray-600"
              >
                그룹 만들기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupList;
