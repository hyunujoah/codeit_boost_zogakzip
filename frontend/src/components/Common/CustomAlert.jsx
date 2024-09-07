import React, { useEffect } from "react";
import Modal from "react-modal";

const CustomAlert = ({ title, message, onClose }) => {
  // useEffect를 사용하여 모듈이 로드될 때 appElement를 설정합니다.
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      // 모달 창의 스타일을 정의합니다.
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
        content: {
          maxWidth: "500px",
          margin: "auto",
          padding: "30px",
          borderRadius: "10px",
          textAlign: "center",
          maxHeight: "320px",
        },
      }}
    >
      {/* 제목을 표시하는 부분입니다. */}
      <h2 className="text-2xl font-bold text-center mt-3 mb-4">{title}</h2>

      {/* 메시지를 표시하는 부분입니다. */}
      <div className="mb-5">
        <label className="block text-lg font-bold text-gray-950">{message}</label>
      </div>

      {/* 확인 버튼을 표시하는 부분입니다. */}
      <div className="mt-16">
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-gray-950 text-white py-3 px-4 rounded-md hover:bg-gray-800"
        >
          확인
        </button>
      </div>
    </Modal>
  );
};

export default CustomAlert;
