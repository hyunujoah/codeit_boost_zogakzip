import React, { useState } from "react";
import { Link } from "react-router-dom";
import { calculateDaysPassed, KformatNumber, randomImage } from "../../util/customFn";
import { API_BASE_URL } from "../../api-config";

const ReleaseGroupCard = ({ group,moveGroupsDetailHandler }) => {
  const {
    id,
    name,
    imageUrl,
    isPublic,
    likeCount,
    badgeCount,
    postCount,
    createdAt,
    introduction,
  } = group;

  const moveDeatil=()=>{
    moveGroupsDetailHandler(`/groups/detail/${id}`);
  }
  
  // 초기 이미지 설정
  const initialImageSrc = imageUrl ? `${imageUrl.includes("http")?imageUrl:API_BASE_URL+imageUrl}` : randomImage();
  const [imgSrc, setImgSrc] = useState(initialImageSrc);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-[375px] min-h-60">
      <span  onClick={moveDeatil}>
        <div className="relative w-full h-auto rounded-t-md cursor-pointer">
          {isLoading && (
            <div className=" inset-0 bg-gray-200 animate-pulse rounded-t-md h-60 block"></div>
          )}
          <img
            src={imgSrc}
            alt={name}
            className={`w-full h-72  object-cover    rounded-t-md ${isLoading ? "hidden" : "block"}`}
        
            onLoad={() => setIsLoading(false)} // 로딩 완료 시 스켈레톤 숨김
            onError={() => setImgSrc(randomImage())}
          />
        </div>
      </span>
      <div className="p-2 block">
        <p className="text-sm text-gray-500">
          {calculateDaysPassed(createdAt)}
          <span className="mx-3">|</span>
          {isPublic ? "공개" : "비공개"}
        </p>
        <span onClick={moveDeatil}>
          <h3 className="text-lg font-bold mt-2 cursor-pointer">{name}</h3>
        </span>
        <span onClick={moveDeatil}>
          <p className="text-gray-600 mt-1 text-sm cursor-pointer" >{introduction}</p>
        </span>
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-xs text-gray-500">획득 배지</p>
            <p className="text-sm font-bold">{KformatNumber(badgeCount)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">추억</p>
            <p className="text-sm font-bold">{KformatNumber(postCount)}</p>
          </div>
          <div className="block items-center">
            <p className="text-xs text-gray-500">그룹 공감</p>
            <div className="flex items-center ml-1">
              <img src="/favicon.svg" alt="공감 아이콘" className="w-4 h-4" />
              <p className="text-sm font-bold ml-1">{KformatNumber(likeCount)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReleaseGroupCard;
