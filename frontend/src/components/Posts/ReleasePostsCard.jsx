import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../api-config';
import { formatMoment, randomImage } from '../../util/customFn';

const ReleasePostsCard = ({ post,movePostsDetailHandler }) => {
  const {
    id,
    nickname,
    title,
    imageUrl,
    isPublic,
    likeCount,
    commentCount,
    createdAt,
    tags,
    location,
    moment,
  } = post;

  const currentLocation = useLocation(); // 현재 위치 정보 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅


  const   movePostsDetail=()=>{
    movePostsDetailHandler(id);
  }
  


  // 초기 이미지 URL 설정
  const initialImageSrc = imageUrl ? `${imageUrl.includes("http")?imageUrl:API_BASE_URL+imageUrl}` : randomImage();
  const [imgSrc, setImgSrc] = useState(initialImageSrc); // 이미지 URL 상태
  const [isLoading, setIsLoading] = useState(true); // 이미지 로딩 상태

  // 이미지 URL이 변경될 때 로딩 상태 초기화
  useEffect(() => {
    setImgSrc(initialImageSrc);
    setIsLoading(true);
  }, [initialImageSrc]);

  // 이미지 로드 완료 시 로딩 상태 업데이트
  const handleImageLoad = () => setIsLoading(false);

  // 이미지 로드 실패 시 랜덤 이미지로 변경
  const handleImageError = () => setImgSrc(randomImage());

  // 포스트 상세 페이지로 이동


  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-[375px]">
      <div className="relative cursor-pointer" onClick={movePostsDetail}>
        {/* 이미지 로딩 상태에 따라 스켈레톤 표시 */}
        {isLoading && (
          <div className="w-full h-48 bg-gray-200 rounded-t-md animate-pulse"></div>
        )}
        <img
          src={imgSrc}
          alt={title}
          className={`w-full h-72  object-cover rounded-t-md ${isLoading ? 'hidden' : 'block'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      <div className="mt-3 mb-3">
        <span className="text-gray-600 font-bold text-sm">{nickname}</span>
        <span className="text-gray-400 mx-3"> | </span>
        <span className="text-gray-500 text-sm">{isPublic ? '공개' : '비공개'}</span>
      </div>
      <div className="mt-3 mb-3">
        <span
          className="text-gray-600 font-bold text-base cursor-pointer"
          onClick={movePostsDetail}
        >
          {title}
        </span>
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-600 mt-1">{tags}</p>
        <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
          <p>
            {location} <span className="mx-1">·</span> {formatMoment(moment)}
          </p>
          <div className="flex space-x-3">
            <span className="flex items-center space-x-1">
              <img src="/favicon.svg" alt="like" className="w-6 h-6" />
              <p>{likeCount}</p>
            </span>
            <span className="flex items-center space-x-1">
              <img src="/images/comment.svg" alt="comment" className="w-6 h-6" />
              <p>{commentCount}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReleasePostsCard;
