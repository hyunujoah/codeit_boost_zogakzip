import React, { useState } from "react";

function ModalGroupPasswordInputForm({name,closeModalGroupPasswordInputForm, setGroupPassword, createFormSubmitRef}) {
  const [password, setPassword] = useState("");


  const passwordHandleSubmit = (e) => {
    e.preventDefault();
    //console.log("Group Data:", password);
    setGroupPassword(password);
    closeModalGroupPasswordInputForm();
    
    setTimeout(() => {
      createFormSubmitRef.current.click();
    }, 300);
    
  };


  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mt-3 mb-5">그룹 비밀 번호 입력</h2>
       <span className="absolute top-5 right-7 text-3xl cursor-pointer" onClick={closeModalGroupPasswordInputForm}>
           x
       </span>
      <form onSubmit={passwordHandleSubmit} method="post">

        <div className="mb-12">
          <label className="block text-lg font-bold text-gray-950"><span className="text-red-500">'{name}'</span>의 
          그룹 비밀번호를 입력해주세요.</label>
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
            확인
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalGroupPasswordInputForm;
