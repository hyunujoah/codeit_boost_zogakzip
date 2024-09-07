import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className="relative flex flex-col items-center h-20 md:h-16 mb-5 cursor-pointer "
    >
      <img src="/logo.svg" alt="logo" className="max-w-full mt-3" />
    </div>
  );
};

export default Header;
