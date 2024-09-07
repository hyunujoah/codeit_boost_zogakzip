import React from "react";
import { Link } from "react-router-dom";

const GroupMakeButton = () => {
  return (
    <div className="max-w-screen-2xl mx-auto 
            relative            
            2xl:max-w-screen-2xl
            2xl:top-0
            2xl:flex
            2xl:justify-end

            xl:max-w-screen-xl
            xl:top-0
            
            lg:max-w-screen-lg
            lg:top-0
                        
            md:max-w-screen-md
            md:top-0

            sm:max-w-screen-sm
            top-10
      ">
      <Link
        to="/groups/create"
        className="bg-gray-950 text-white py-2 px-5 rounded-md absolute right-0 -top-20 
             hover:bg-gray-800 cursor-pointer">
        그룹 만들기
      </Link>
    </div>
  );
};

export default GroupMakeButton;
