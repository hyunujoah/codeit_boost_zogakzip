import React, { useState } from 'react';

const ModalCommentUpdateForm = ({ comment, updateSubmitCommentHandler, closeModalCommentUpdateHandler }) => {
  // 폼 상태 관리
  const [nickname, setNickname] = useState(comment.nickname); // 초기값을 기존 댓글의 닉네임으로 설정
  const [content, setContent] = useState(comment.content); // 초기값을 기존 댓글의 내용으로 설정
  const [password, setPassword] = useState(''); // 비밀번호 상태 관리

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 댓글 업데이트를 위한 데이터 준비
    const formData = {
      nickname: nickname,
      content: content,
      password: password,
    };

    // 업데이트 함수 호출
    updateSubmitCommentHandler(formData);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* 제목 */}
      <h2 className="text-center text-xl font-semibold mb-6">댓글 수정</h2>
      {/* 모달 닫기 버튼 */}
      <span
        className="absolute top-5 right-7 text-3xl cursor-pointer"
        onClick={closeModalCommentUpdateHandler}
      >
        x
      </span>
      {/* 댓글 수정 폼 */}
      <form onSubmit={handleSubmit} method="post">
        {/* 닉네임 입력 */}
        <div className="mb-5">
          <label className="block text-gray-600 font-medium mb-2">닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-600"
            required
          />
        </div>

        {/* 댓글 내용 입력 */}
        <div className="mb-5">
          <label className="block text-gray-600 font-medium mb-2">댓글</label>
          <textarea
            className="w-full h-28 p-3 border rounded-lg text-gray-600"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="mb-5">
          <label className="block text-gray-600 font-medium mb-2">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            className="w-full p-3 border rounded-lg text-gray-600 placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* 수정하기 버튼 */}
        <button
          type="submit"
          className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
        >
          수정하기
        </button>
      </form>
    </div>
  );
};

export default ModalCommentUpdateForm;
