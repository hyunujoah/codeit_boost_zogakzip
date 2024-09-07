import React, { useState } from "react";
import CustomAlert from "../Common/CustomAlert";
import { API_BASE_URL } from "../../api-config";

const ModalCommentCreationForm = ({ closeModalCommentCreateHandler, post, setCommentState }) => {
  // 폼 상태 관리
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");

  // 알림창 상태 관리
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 백엔드로 보낼 데이터 준비
    const formData = {
      nickname,
      content,
      password,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/${post.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // 실패 시 알림 설정
        setAlertTitle("댓글 등록 실패");
        setAlertMessage(responseData.message || "댓글 등록에 실패하였습니다.");
        setIsAlertOpen(true);
        return;
      }

      // 성공 시 알림 설정
      setAlertTitle("댓글 등록 성공");
      setAlertMessage("댓글 등록에 성공하였습니다.");
      setIsSuccess(true);
      setIsAlertOpen(true);
      setCommentState((prevCommentState) => !prevCommentState);
    } catch (error) {
      // 오류 처리
      console.error("댓글 등록 실패:", error);
      setAlertTitle("댓글 등록 실패");
      setAlertMessage("댓글 등록에 실패하였습니다. " + error.message);
      setIsAlertOpen(true);
    }
  };

  // 알림창 핸들러
  const handleAlertClose = () => {
    setIsAlertOpen(false);
    if (isSuccess) {
      closeModalCommentCreateHandler();
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-4">
        {/* 제목 */}
        <h2 className="text-center text-xl font-semibold mb-6">댓글 등록</h2>
        <span
          className="absolute top-5 right-7 text-3xl cursor-pointer"
          onClick={closeModalCommentCreateHandler}
        >
          x
        </span>
        {/* 폼 */}
        <form onSubmit={handleSubmit}>
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

          {/* 댓글 입력 */}
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

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
          >
            등록하기
          </button>
        </form>
      </div>

      {/* 알림창 컴포넌트 */}
      {isAlertOpen && (
        <CustomAlert
          title={alertTitle}
          message={alertMessage}
          onClose={handleAlertClose}
        />
      )}
    </>
  );
};

export default ModalCommentCreationForm;
