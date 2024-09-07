import React, { useState } from 'react';
import Modal from 'react-modal';
import ModalCommentUpdateForm from './ModalCommentUpdateForm';
import CustomAlert from '../Common/CustomAlert';
import ModalCommentDeleteForm from './ModalCommentDeleteForm';
import { API_BASE_URL } from '../../api-config';
import { getFormattedCurrentDate } from '../../util/customFn';

const Comment = ({ comment, commentState, setCommentState, post }) => {
  // 상태 관리
  const [isAlertOpen, setIsAlertOpen] = useState(false); 
  const [alertTitle, setAlertTitle] = useState(""); // 변수명 오타 수정 (alter -> alert)
  const [alertMessage, setAlertMessage] = useState("");

  // 모달 상태 관리
  const [isCommentModalOpenUpdateForm, setIsCommentModalOpenUpdateForm] = useState(false);
  const [isCommentModalOpenDeleteForm, setIsCommentModalOpenDeleteForm] = useState(false);

  // 댓글 수정 처리 함수
  const updateSubmitCommentHandler = async (commentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/comments/${comment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      const responseData = await response.json();

      if (!response.ok) {            
        setAlertTitle("댓글 수정 실패");    
        setAlertMessage(responseData.message === "비밀번호가 틀렸습니다" 
          ? "비밀번호가 틀렸습니다." 
          : "댓글 수정 권한 인증에 실패하였습니다.");
        setIsAlertOpen(true); 
        return;
      }

      setAlertTitle("댓글 수정 성공");    
      setAlertMessage("댓글 수정에 성공하였습니다.");   
      setIsCommentModalOpenUpdateForm(false);                         
      setIsAlertOpen(true);  
      setCommentState((prevState) => !prevState);

    } catch (error) {
      setAlertTitle("댓글 수정 실패");    
      setAlertMessage("댓글 수정에 실패하였습니다.");     
      setIsAlertOpen(true); 
    }
  };

  // 댓글 삭제 처리 함수
  const deleteSubmitCommentHandler = async ({ password }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/comments/${comment.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const responseData = await response.json();

      //console.log(" 댓글 삭제 :", responseData);

      if (!response.ok) {
        setAlertTitle("댓글 삭제 실패");    
        setAlertMessage(responseData.message === "비밀번호가 틀렸습니다" 
          ? "비밀번호가 틀렸습니다." 
          : "댓글 삭제 권한 인증에 실패하였습니다.");
        setIsAlertOpen(true); 
        return;
      }

      setAlertTitle("댓글 삭제 성공");    
      setAlertMessage("댓글 삭제에 성공하였습니다.");                         
      setIsCommentModalOpenDeleteForm(false); 
      setIsAlertOpen(true);           

    } catch (error) {
      setAlertTitle("댓글 삭제 실패");    
      setAlertMessage("댓글 삭제에 실패하였습니다." + error);          
      setIsAlertOpen(true); 
    }
  };

  const buttonDeleteHandler = () => {
    setIsAlertOpen(false);
    if(alertTitle === "댓글 삭제 성공") {
      setCommentState((prevState) => !prevState);
    }
  }

  return (
    <>
      <div className="border-b border-gray-200 py-4">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="font-bold text-gray-800 mr-3">{comment.nickname}</span>
            <span className="text-sm text-gray-500">{getFormattedCurrentDate(comment.createdAt)}</span>
          </div>
          <div className="flex space-x-4">
            <span 
              className="text-sm text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => setIsCommentModalOpenUpdateForm(true)}
            >
              <img src='/images/edit.svg' alt='수정' />
            </span>
            <span 
              className="text-sm text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => setIsCommentModalOpenDeleteForm(true)}
            >
              <img src='/images/delete.svg' alt='삭제' />
            </span>
          </div>
        </div>
        <p className="text-gray-700">{comment.content}</p>
      </div>

      {/* 댓글 수정 모달 */}
      <Modal
        isOpen={isCommentModalOpenUpdateForm}
        appElement={document.getElementById('root')}
        onRequestClose={() => setIsCommentModalOpenUpdateForm(false)}
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.65)' },
          content: {            
            maxWidth: "500px",
            margin: 'auto', // 화면 중앙에 위치하도록 설정
            height: window.innerWidth <= 768 ? '80%' : '60%',
            color: 'black', 
          }
        }}
      >
        <ModalCommentUpdateForm
          closeModalCommentUpdateHandler={() => setIsCommentModalOpenUpdateForm(false)}
          updateSubmitCommentHandler={updateSubmitCommentHandler}  
          comment={comment}
        />        
      </Modal>

      {/* 댓글 삭제 모달 */}
      <Modal
        isOpen={isCommentModalOpenDeleteForm}
        appElement={document.getElementById('root')}
        onRequestClose={() => setIsCommentModalOpenDeleteForm(false)}
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.65)' },
          content: {            
            maxWidth: "500px",
            margin: 'auto', // 화면 중앙에 위치하도록 설정
            height: '400px', // 필요에 따라 높이도 조절 가능
            color: 'black', 
          }
        }}
      >
        <ModalCommentDeleteForm
          closeModalCommentDeleteHandler={() => setIsCommentModalOpenDeleteForm(false)}
          deleteSubmitCommentHandler={deleteSubmitCommentHandler} 
        />        
      </Modal>

      {/* 알림창 컴포넌트 */}
      {isAlertOpen && (
        <CustomAlert
          title={alertTitle}
          message={alertMessage}
          onClose={() => buttonDeleteHandler()}
        />
      )}
    </>
  );
};

export default Comment;
