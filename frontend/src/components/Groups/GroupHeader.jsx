import React, { useState, useEffect } from 'react';
import { calculateDaysPassed, KformatNumber, randomImage } from '../../util/customFn';
import { API_BASE_URL } from '../../api-config';
import BadgeDisplay from '../Comment/BadgeDisplay';

const GroupHeader = ({
  modalIsOpenGroupsUpdateHandler,
  modalIsOpenGroupsDeleteHandler,
  sendLikeHandler,
  group,
}) => {
  // 이미지 로딩 상태
  const [imgSrc, setImgSrc] = useState();
  const [loading, setLoading] = useState(true); // 로딩 상태

  const initialImageSrc = group.imageUrl ? `${group.imageUrl.includes("http")?group.imageUrl:API_BASE_URL+group.imageUrl}` : randomImage();

  useEffect(() => {
    setImgSrc(initialImageSrc);
  }, [initialImageSrc]);

  // 이미지 로드 완료 핸들러
  const handleImageLoad = () => {
    setLoading(false); // 로딩 완료
  };

  // 이미지 로드 에러 핸들러
  const handleImageError = () => {
    setImgSrc(randomImage()); // 오류 발생 시 랜덤 이미지 설정
  };

  // 그룹 세부 정보를 렌더링하는 함수
  const renderGroupDetails = () => (
    <div className="mt-4 lg:mt-0 lg:ml-6 w-full">
      <div className="flex items-center space-x-2 text-sm text-gray-400">
        <span>{calculateDaysPassed(group.createdAt)}</span>
        <span>|</span>
        <span className="text-gray-500">
          {group.isPublic ? "공개" : "비공개"}
        </span>
      </div>

      <div className="mt-3 mb-5">
        <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 text-sm text-gray-500 mt-1">
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-950">
            {group.name}
          </h2>
          <div className="flex items-center space-x-2 lg:space-x-4">
            <span className="font-bold text-gray-950">
              추억 {KformatNumber(group.postCount)}
            </span>
            <span>|</span>
            <span className="font-bold text-gray-950">
              그룹 공감 {KformatNumber(group.likeCount)}
            </span>
          </div>
        </div>

        <p className="text-gray-500 lg:mt-3 lg:mb-12">{group.introduction}</p>
      </div>

      {/* 획득한 배지를 렌더링하는 부분 */}
      <div>
        <div className="flex space-x-2 mt-3">
          <span className="font-bold text-gray-950">획득 배지</span>
        </div>
        <div className="mt-3 flex flex-wrap lg:flex-nowrap lg:space-x-2 space-y-3 lg:space-y-0">
          {group.badges.map((badge, index) => (
            <BadgeDisplay key={index} badge={badge} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row justify-between relative items-start lg:items-center p-6 bg-white border-b border-gray-200 lg:pb-32 mb-36 lg:pl-0 lg:pr-0">
      <div className="flex flex-col lg:flex-row items-start lg:items-center w-full">
        {/* 그룹 이미지 */}
        <div className="w-140 h-140 lg:w-60 lg:h-60 rounded-lg overflow-hidden relative">
          {/* 로딩 중 메시지 */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white opacity-75">
              <span className="text-gray-500">로딩 중...</span>
            </div>
          )}
          <img
            src={imgSrc}
            alt="Group"
            className={`w-full h-full object-cover transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        </div>

        {/* 그룹 정보 렌더링 */}
        {renderGroupDetails()}
      </div>

      {/* 그룹 정보, 그룹 삭제, 공감 보내기 버튼 */}
      <div className="flex flex-col justify-between lg:ml-6 mt-4 lg:mt-0 w-full lg:max-w-[250px] top-5 right-0 lg:absolute lg:text-right">
        <div className="space-x-8 mb-4 lg:mb-16">
          <button
            className="text-gray-800 hover:underline text-sm hover:font-bold"
            onClick={modalIsOpenGroupsUpdateHandler}
          >
            그룹 정보 수정하기
          </button>

          <button
            className="text-gray-800 hover:underline text-sm hover:font-bold"
            onClick={modalIsOpenGroupsDeleteHandler}
          >
            그룹 삭제하기
          </button>
        </div>

        <div className="mt-2 lg:mt-16 lg:text-right lg:justify-end lg:flex">
          <button
            onClick={sendLikeHandler}
            className="flex items-center px-4 py-2 border rounded-lg text-gray-950 hover:bg-gray-100 w-full lg:w-auto justify-center"
          >
            <img
              src="/favicon.svg"
              alt="log"
              width={20}
              height={20}
              className="mr-2"
            />
            공감 보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupHeader;
