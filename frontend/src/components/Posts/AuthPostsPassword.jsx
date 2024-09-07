import React, { useState } from 'react';

const AuthPostsPassword = ({ postsPasswordConfirmHandler }) => {
  const [password, setPassword] = useState("");

  const postsPasswordConfirm = (event) => {
    event.preventDefault();
    postsPasswordConfirmHandler(password);
  }

  return (
    <div className="flex items-center justify-center min-h-screen -mt-40">
      <div className="w-full max-w-xl p-8 bg-white rounded-lg">
        <h2 className="text-center text-3xl font-semibold mb-4">비공개 추억</h2>
        <p className="text-center text-gray-800 mb-6">
          비공개 추억에 접근하기 위해 권한 확인이 필요합니다.
        </p>
      <form onSubmit={postsPasswordConfirm} method='post'>
        <label className="block text-sm font-bold text-gray-700 mb-2 mt-5">
         비밀번호를 입력해 주세요
        </label>
        <input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          name="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        />

        <button 
          className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-600 transition"
          type="submit"
        >
          제출하기
        </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPostsPassword;
