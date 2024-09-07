import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { API_BASE_URL } from "../../api-config";
import Pagination from "../Common/Pagination";
import NotFoundComments from "./NotFoundComments";

function CommentList({ post, commentState, setCommentState }) {
  // 페이지네이션 관련 상태 관리
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);

  // 댓글 리스트 상태 관리
  const [comments, setComments] = useState([]);

  // 댓글 가져오기 함수
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/posts/${post.id}/comments`);
        if (!response.ok) {
          console.log("댓글 가져오기 실패");
          return;
        }
        const responseData = await response.json();
        setCurrentPage(responseData.currentPage);
        setTotalPages(responseData.totalPages);
        setTotalItemCount(responseData.totalItemCount);
        setComments(responseData.data);
      } catch (error) {
        console.error("댓글 가져오는 중 오류 발생:", error);
      }
    };
    fetchComments();
  }, [commentState, post.id]);

  return (
    <>
      <div className="w-full mx-auto p-4 bg-white rounded mb-36">
        <h3 className="font-semibold text-lg mb-4 border-b-2 pb-2 border-gray-300">
          댓글 {totalItemCount}
        </h3>
        <div>
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                commentState={commentState}
                setCommentState={setCommentState}
                post={post}
              />
            ))
          ) : (
            <NotFoundComments />
          )}
        </div>
      </div>

      <Pagination
        page={currentPage}
        pageSize={8}
        totalItems={totalItemCount}
        url={`${API_BASE_URL}/api/posts/${post.id}/comments`}
        params={""}
        setCurrentPage={setCurrentPage}
        setTotalPages={setTotalPages}
        setTotalItemCount={setTotalItemCount}
        setDataList={setComments}
      />
    </>
  );
}

export default CommentList;
