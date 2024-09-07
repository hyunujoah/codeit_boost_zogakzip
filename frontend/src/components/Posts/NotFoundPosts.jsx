import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPosts = ({groupId}) => {
  const navigate = useNavigate();

  
  return (
    <div className="text-center flex justify-center w-full top-56 relative ">
    <div className='text-center mb-60'>
      <div className="flex justify-center mb-3">
        <img src="/images/NodataGroup.svg" alt="No Data" />
      </div>
      <h2 className="text-2xl font-bold text-gray-400 mt-5">게시된 추억이 없습니다.</h2>
      <p className="text-gray-400 mt-3">첫 번째 추억을 올려보세요!</p>
      <div className="flex justify-center mt-36">
        
        <button 
          onClick={() => navigate(`/posts/${groupId}/create`)}
          className="w-96 h-12 bg-gray-950 text-white font-bold rounded-md hover:bg-gray-600"
        >
          추억 올리기
        </button>
      </div>
    </div>
  </div>
  )
}

export default NotFoundPosts