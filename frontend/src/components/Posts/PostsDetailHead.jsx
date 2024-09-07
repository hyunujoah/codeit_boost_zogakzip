import React, { useState } from "react";
import { formatMoment } from "../../util/customFn";
import CustomAlert from "../Common/CustomAlert";
import { API_BASE_URL } from "../../api-config";

function PostsDetailHead({
  post,
  setPost,
  modalIsOpenPostsUpdateHandler,
  modalIsOpenPostsDeleteHandler,
}) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alterTitle, setAlterTitle] = useState("");
  const [alterMessage, setAlterMessage] = useState("");

  //공감 보내기
  const likeSendHandler = async () => {
    const response = await fetch(`${API_BASE_URL}/api/posts/${post.id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setAlterTitle("공감 보내기 실패");
      setAlterMessage("공감 보내기에 실패하였습니다.");
      setIsAlertOpen(true);
      return;
    }

    setPost({ ...post, likeCount: post.likeCount + 1 });
    setAlterTitle("공감 보내기 성공");
    setAlterMessage("공감 보내기에 성공하였습니다.");
    setIsAlertOpen(true);
  };

  return (
    <>
      <div className="bg-white p-6 w-full mx-auto my-8 border-b-2 pb-11 mb-16  border-gray-50">
        <div className="flex  flex-col lg:flex-row items-left   lg:items-center  justify-between">
          <div className="flex items-center   space-x-2 mb-3 lg:mb-0">
            <span className="text-sm font-medium text-gray-700">
              {post.nickname}
            </span>
            <span className="text-xs text-gray-500 px-2">|</span>
            <span className="text-xs text-gray-500">
              {" "}
              {post.isPublic==="true" ? "공개" : "비공개"}
            </span>
          </div>
          <div className="flex  lg:space-x-3   text-gray-500">
            <button
              className="text-sm mr-10"
              onClick={modalIsOpenPostsUpdateHandler}
            >
              추억 수정하기
            </button>
            <button className="text-sm" onClick={modalIsOpenPostsDeleteHandler}>
              추억 삭제하기
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-4">{post.title}</h2>

        <div className="flex space-x-2 mt-2">
          {post.tags.map((tag) => (
            <span className="text-md text-gray-500 " key={tag}>
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between mt-4">
          <div className="mt-4 ">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div className="text-sm   text-gray-950">
                <span className="font-bold">{post.location}</span> ·{" "}
                <span className="font-bold">{formatMoment(post.moment)}</span>
              </div>

              <div className="flex items-center space-x-4 ml-10">
                <div className="flex items-center space-x-1 text-gray-500">
                  <img src="/favicon.svg" alt="좋아요" className="w-5 h-5" />
                  <span>{post.likeCount}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <img
                    src="/images/comment.svg"
                    alt="댓글"
                    className="w-5 h-5"
                  />
                  <span>{post.commentCount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button
              className="flex items-center justify-center w-40     h-10 border !border-gray-950 
                rounded-md   text-gray-700 hover:bg-gray-200"
              onClick={() => likeSendHandler()}
            >
              <img src="/favicon.svg" alt="좋아요" className="w-5 h-5 mr-2" />{" "}
              공감 보내기
            </button>
          </div>
        </div>
      </div>

      {/* 알림창 컴포넌트 */}
      {isAlertOpen && (
        <CustomAlert
          title={alterTitle}
          message={alterMessage}
          onClose={() => setIsAlertOpen(false)}
        />
      )}
    </>
  );
}

export default PostsDetailHead;
