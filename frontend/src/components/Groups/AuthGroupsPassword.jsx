import React, { useState } from 'react';

const AuthGroupsPassword = ({ groupsPasswordConfirmHandler }) => {
  const [password, setPassword] = useState("");

  // 비밀번호 확인 핸들러
  const handlePasswordConfirm = (event) => {
    event.preventDefault();
    if (password.trim()) { // 공백이 아닌 비밀번호인지 확인
      groupsPasswordConfirmHandler(password);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen -mt-40">
      <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-semibold mb-4">비공개 그룹</h2>
        <form method="post" onSubmit={handlePasswordConfirm}>
          <p className="text-center text-gray-800 mb-6">
            비공개 그룹에 접근하기 위한 권한 확인이 필요합니다.
          </p>

          <label className="block text-sm font-bold text-gray-700 mb-2 mt-5">
            비밀번호 입력
          </label>
          <input
            type="password"
            placeholder="그룹 비밀번호를 입력해 주세요"
            name="password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)} // 구조 분해 할당 사용
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-600 transition-colors duration-300"
          >
            제출하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthGroupsPassword;
