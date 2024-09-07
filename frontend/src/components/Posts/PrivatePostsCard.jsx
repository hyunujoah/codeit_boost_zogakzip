import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const PrivatePostsCard = ({ post, movePostsDetailHandler}) => {
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

  const currentLocation = useLocation();
  const navigate = useNavigate();

  const   movePostsDetail=()=>{
    movePostsDetailHandler(id);
  }
  
  

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-[375px] ">
      <div className="mt-3 mb-3">
        <span className="text-gray-600 font-bold text-sm">{nickname}</span>
        <span className="text-gray-400 ml-3  mr-3 "> | </span>
        <span className="text-gray-500 text-sm">{isPublic==="true" ? '공개' : '비공개'}</span>
      </div>

      <div className="mt-3 mb-3"> 
          <span className="text-gray-600 font-bold text-base cursor-pointer" 
            onClick={movePostsDetail}
          >{title}</span>
      </div>

      <div className="mt-2">
        
        <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
          
          <div className="flex space-x-3"> 
            <span className="flex items-center space-x-1 mr-3">
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

export default PrivatePostsCard;
