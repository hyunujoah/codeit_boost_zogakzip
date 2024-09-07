import React, { useState } from "react";

function ModalPostsDeleteForm({closeModalPostsDeleteHandler, deleteSubmitHandler}) {
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    deleteSubmitHandler(password);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mt-3 mb-5">추억 삭제</h2>
       <span className="absolute top-5 right-7 text-3xl cursor-pointer" onClick={closeModalPostsDeleteHandler}>
           x
       </span>
      <form onSubmit={handleSubmit} method="post">

        <div className="mb-12">
          <label className="block text-lg font-bold text-gray-950">삭제 권한 인증</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder=" 비밀번호를 입력해 주세요"
            required
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-gray-950 text-white py-3 px-5 rounded-md hover:bg-gray-800 hover:text-white"          
          >
            삭제하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalPostsDeleteForm;
