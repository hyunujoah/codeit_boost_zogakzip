import React, { useEffect, useState } from "react";
import PostsMakeButton from "./PostsMakeButton";
import PostsSearchForm from "./PostsSearchForm";
import ReleasePostsCard from "./ReleasePostsCard";
import PrivatePostsCard from "./PrivatePostsCard";
import NotFoundPosts from "./NotFoundPosts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../api-config";

const PostList = ({ group }) => {
  const { groupId, type } = useParams(); 
  const [posts, setPosts] = useState([]); // 게시글 상태
  const [isPublic, setIsPublic] = useState(true); // 공개 여부 상태
  const [keyword, setKeyword] = useState(""); // 검색어 상태
  const [sortBy, setSortBy] = useState("createdAt"); // 정렬 기준 상태

  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [totalItemCount, setTotalItemCount] = useState(0); // 총 항목 수 상태
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수 상태
  
  
  const currentLocation = useLocation(); // 현재 위치 정보 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅


  useEffect(() => {
    // 게시글을 가져오는 함수
    const fetchPosts = async () => {
      const url=`${API_BASE_URL}/api/groups/${groupId}/posts?isPublic=${isPublic}&page=${page}&pageSize=8&keyword=${keyword}&sortBy=${sortBy}`;
      console.log("url", url);
      try {                
        const response = await fetch(
          `${API_BASE_URL}/api/groups/${groupId}/posts?isPublic=${isPublic}&page=${page}&pageSize=8&keyword=${keyword}&sortBy=${sortBy}`
        );
        if (!response.ok) throw new Error("데이터 가져오기 오류");
        
        const responseData = await response.json();
        console.log("responseData", responseData);
        setPosts(responseData.data);
        setTotalItemCount(responseData.totalItemCount);
        setTotalPages(responseData.totalPages);
      } catch (error) {
        console.error("fetchPosts error:", error);
      }
    };

    fetchPosts();


  }, [groupId, isPublic, keyword, sortBy]); // 의존성 배열

  // 공개/비공개 설정 처리
  const handleIsPublic = (getIsPublic) => {
    setPage(1);
    setKeyword(""); // 검색어 초기화
    setIsPublic(getIsPublic);
  };

  // 검색어 입력 처리
  const handleSearch = (term) => {
    setKeyword(term);
  };

  const sortByChangeHandler = (option) => {
    setPage(1);
    setSortBy(option);
  };

  // 더보기 버튼 클릭 처리
  const handleLoadMore =async () => {
    const currentPage=page+1;
    try {
      setLoading(true); // 로딩 상태 설정
      const response = await fetch(
        `${API_BASE_URL}/api/groups/${groupId}/posts?isPublic=${isPublic}&page=${currentPage}&pageSize=8&keyword=${keyword}&sortBy=${sortBy}`
      );
      if (!response.ok) throw new Error("데이터 가져오기 오류");
      
      const responseData = await response.json();
      setPosts( [...posts, ...responseData.data]);
      setTotalItemCount(responseData.totalItemCount);
      setTotalPages(responseData.totalPages);
      setPage(currentPage); // 페이지 증가
    } catch (error) {
      console.error("fetchPosts error:", error);
    }finally{
     
    }
    setLoading(false); // 로딩 상태 해제

  };

  const movePostsDetailHandler = (postId) => {
    localStorage.setItem('beforePage', currentLocation.pathname); // 현재 페이지 경로 저장
   
    sessionStorage.setItem('postsData', JSON.stringify(posts));
    navigate(`/posts/detail/${postId}`); // 상세 페이지로 이동
  };

  return (
    <div className="w-full mt-36 mb-36">
      <h2 className="text-center font-bold text-2xl mb-10">추억목록</h2>
      <PostsMakeButton group={group} />

      <PostsSearchForm 
        isPublic={isPublic} 
        handleIsPublic={handleIsPublic} 
        keyword={keyword}
        setKeyword={handleSearch} 
        setSortBy={sortByChangeHandler} 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {posts.length > 0 && (
          posts.map((post) =>
            isPublic ? (
              <ReleasePostsCard key={post.id} post={post} movePostsDetailHandler={movePostsDetailHandler}    />
            ) : (
              <PrivatePostsCard key={post.id} post={post}  movePostsDetailHandler={movePostsDetailHandler}  />
            )
          )
        ) }
      </div>

      {posts.length === 0 && (
         <div className="grid grid-cols-1 ">
              <NotFoundPosts />
        </div>
      )}
    

      {!loading && (posts.length < totalItemCount) && (
        <div className="mb-5 mt-20">
          <button
            type="button"
            onClick={handleLoadMore}
            className="w-full bg-gray-0 text-black py-3 rounded-md border border-black hover:bg-black hover:!text-white"
          >
            더보기
          </button>
        </div>
      )}




    </div>
  );
};

export default PostList;
