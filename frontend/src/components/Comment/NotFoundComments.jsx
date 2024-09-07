import React from 'react'

const NotFoundComments = () => {
  return (
    <div className="text-center flex justify-center w-full top-56 relative ">
    <div className='text-center mb-60'>
      <div className="flex justify-center mb-3">
        <img src="/images/NodataGroup.svg" alt="No Data" />
      </div>
      <h2 className="text-2xl font-bold text-gray-400 mt-5">등록 댓글이 없습니다.</h2>
      <p className="text-gray-400 mt-3">첫 번째 댓글을 올려보세요!</p>
      
    </div>
  </div>
  )
}

export default NotFoundComments