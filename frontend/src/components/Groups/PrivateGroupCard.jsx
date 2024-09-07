import React from 'react';
import { Link } from 'react-router-dom';
import { calculateDaysPassed, KformatNumber } from '../../util/customFn';

const PrivateGroupCard = ({group,moveGroupsDetailHandler}) => {
  const {id, name, imageUrl, isPublic,likeCount, badgeCount, postCount, createdAt ,introduction}=group
  

  const moveDeatil=()=>{
    moveGroupsDetailHandler(`/groups/detail/${id}`);
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-[375px]">
      <div className="p-2">
       <p className="text-sm text-gray-500">{calculateDaysPassed(createdAt)}
           <span className="ml-3 mr-3"> | </span>
          {isPublic==="true" ? "공개" : "비공개"}</p>
        <span onClick={moveDeatil}>
          <h3 className="text-lg font-bold mt-2 cursor-pointer">{name}</h3>
        </span>

        <div className="flex justify-start items-center mt-4">
          
          <div>
            <p className="text-xs text-gray-500">추억</p>
            <p className="text-sm font-bold">{KformatNumber(badgeCount)}</p>
          </div>
          <div className=" items-center ml-10">
            <p className="text-xs text-gray-500 block">그룹 공감</p>
            <div className="flex items-center ml-1">
              <img src="/favicon.svg" alt="공감 아이콘" className="w-4 h-4"/>
              <p className="text-sm font-bold ml-1">{KformatNumber(likeCount)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default PrivateGroupCard;
