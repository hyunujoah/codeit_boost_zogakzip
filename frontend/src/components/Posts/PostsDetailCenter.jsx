import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../api-config";
import { convertNewlinesToBr, randomImage } from "../../util/customFn";

function PostsDetailCenter({ post, modalIsOpenCommentCreateHandler }) {
  // 초기 이미지 URL 설정
  const initialImageSrc = post.imageUrl? `${post.imageUrl.includes("http")?post.imageUrl:API_BASE_URL+post.imageUrl}`: randomImage(750);

   

  const [imgSrc, setImgSrc] = useState(initialImageSrc); // 이미지 URL 상태
  const [isLoading, setIsLoading] = useState(true); // 이미지 로딩 상태

  useEffect(() => {
    setImgSrc(initialImageSrc);
  }, [post]);

  // 이미지 로드 완료 시 로딩 상태 업데이트
  const handleImageLoad = () => setIsLoading(false);

  // 이미지 로드 실패 시 랜덤 이미지로 변경
  const handleImageError = () => setImgSrc(randomImage(750));

  return (
    <div className="flex flex-col items-center justify-center  w-full my-8 px-4 mb-52">
      {/* 이미지 로딩 상태에 따라 스켈레톤 표시 */}
      {isLoading && (
        <div className="w-full h-48 bg-gray-200 rounded-t-md animate-pulse"></div>
      )}
      <img
        src={imgSrc}
        alt={post.title}
        className={`max-w-full h-auto rounded-lg shadow-md ${
          isLoading ? "hidden" : "block"
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />

      <div className="mt-4  w-full lg:w-2/4  text-left text-gray-700 whitespace-normal  text-lg p-5">
        <div
          dangerouslySetInnerHTML={{
            __html: convertNewlinesToBr(post.content),
          }}
        />
        {/* 인천 앞바다에서 월척을 낚았습니다!
        가족들과 기억에 오래도록 남을 멋진 하루였어요 가족들과 
        기억에 오래도록 남을 멋진 하루였어요 가족들과 기억에 오래도록 남을 멋진 하루였어요
        <br/> <br/>

        인천 앞바다에서 월척을 낚았습니다!
        가족들과 기억에 오래도록 남을 멋진 하루였어요
        <br/> <br/>
        인천 앞바다에서 월척을 낚았습니다! */}
      </div>
      <button
        onClick={modalIsOpenCommentCreateHandler}
        className="mt-16 px-32 py-3  bg-gray-800 rounded-md  text-white  shadow hover:bg-gray-700"
      >
        댓글 등록하기
      </button>
    </div>
  );
}

export default PostsDetailCenter;
