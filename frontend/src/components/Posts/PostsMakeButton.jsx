import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const PostsMakeButton = ({ group }) => {
  const currentLocation = useLocation();
  const navigate = useNavigate();

  // 추억 올리기 페이지로 이동
  const moveCreatePosts = () => {
    localStorage.setItem('beforePage', currentLocation.pathname);
    navigate(`/posts/${group.id}/create`);
  };

  return (
    <>
      <div className="max-w-screen-2xl mx-auto relative flex justify-end">      
        <span
          onClick={()=>navigate(-1)}
          className="bg-gray-950 text-white py-2 px-5 rounded-md absolute right-0 -top-20 
               hover:bg-gray-800 cursor-pointer mr-36">
        이전 화면
        </span>
      </div>

      <div className="max-w-screen-2xl mx-auto relative flex justify-end">      
        <span
          onClick={moveCreatePosts}
          className="bg-gray-950 text-white py-2 px-5 rounded-md absolute right-0 -top-20 
               hover:bg-gray-800 cursor-pointer">
          추억 올리기
        </span>
      </div>
    </>
  );
};

export default PostsMakeButton;
