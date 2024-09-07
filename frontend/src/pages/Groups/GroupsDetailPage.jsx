import React, { useEffect, useState } from 'react';
import AuthGroupsPassword from '../../components/Groups/AuthGroupsPassword';
import GroupHeader from '../../components/Groups/GroupHeader';
import Modal from 'react-modal';
import ModalGroupsUpdateForm from '../../components/Groups/ModalGroupsUpdateForm';
import ModalGroupsDeleteForm from '../../components/Groups/ModalGroupsDeleteForm';
import { redirect, useNavigate, useParams, useRouteLoaderData } from 'react-router-dom';
import PostList from '../../components/Posts/PostList';
import CustomAlert from '../../components/Common/CustomAlert';
import { API_BASE_URL } from '../../api-config';


const GroupsDetailPage = () => {
  const {groupData} =useRouteLoaderData("groupData");
  const navigate = useNavigate();

  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [isModalOpenUpdateForm, setIsModalOpenUpdateForm] = useState(false);
  const [isModalOpenDeleteForm, setIsModalOpenDeleteForm] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const [group, setGroup]=useState(groupData);
  const [isAlertOpen, setIsAlertOpen] = useState(false); 
  const [alterTitle, setAlterTitle] = useState("");
  const [alterMessage, setAlterMessage] = useState("");





  const movePageHandler = (url) => {
    navigate(url);
  }
  //console.log("******************** 가져온 데이터 :", group);
  

  //1.비공개일 경우 비빌번호 확인 처리
  const groupsPasswordConfirmHandler = async (password) => {       
    const response=await fetch(`${API_BASE_URL}/api/groups/${group.id}/verify-password`, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({password}),
    });

    const responseData=await response.json();

    if(!response.ok || (responseData.message!=="비밀번호가 확인되었습니다" )) {
      //알림창
      setAlterTitle("비공개 그룹 접근 실패");    
      setAlterMessage("비밀번호가 일치하지 않습니다.");
      setIsAlertOpen(true);
      return;
    }
    setPasswordConfirm(true);
 };



  //2.그룹 삭제 처리
  const deleteSubmitHandler = async (password) => {

    const response=await fetch(`${API_BASE_URL}/api/groups/${group.id}`, {
        method:"delete",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({groupId:group.id   ,password}),
    });

    const responseData=await response.json();
    if(!response.ok) {        
      if(responseData.message==="비밀번호가 틀렸습니다" ){
          setAlterTitle("그룹 삭제 실패");    
          setAlterMessage("비밀번호가 틀렸습니다.");  
          setIsAlertOpen(true);
          return;
      }
      setAlterTitle("그룹 삭제 실패");    
      setAlterMessage("그룹 삭제에 실패하였습니다.");
      setIsAlertOpen(true);    
      return;
    }

      setAlterTitle("그룹 삭제 성공");    
      setAlterMessage("그룹 삭제에 성공하였습니다.");
      setDeleteSuccess(true);     
      setIsModalOpenDeleteForm(false);
      alertCustomHander(true);    
  }


  //3.공감 보내기
  const sendLikeHandler =async () => {        
      const response=await fetch(`${API_BASE_URL}/api/groups/${group.id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
    });

    if(!response.ok) {
      setAlterTitle("공감 보내기 실패");    
      setAlterMessage("공감 보내기에 실패하였습니다.");
      setIsAlertOpen(true);    
      return;
    }

    setGroup({...group, likeCount:group.likeCount+1});
    setAlterTitle("공감 보내기 성공");    
    setAlterMessage("공감 보내기에 성공하였습니다.");
    setIsAlertOpen(true);    
  };



  //4.삭제 처리 실패시 확인
  const alertCustomHander = (value) => {      
    setIsAlertOpen(value); 
    if(deleteSuccess){
       navigate(-1);
    }
 }


  return (    
    <>     
      {!groupData.isPublic && !passwordConfirm && <AuthGroupsPassword groupsPasswordConfirmHandler={groupsPasswordConfirmHandler} />}

      {(groupData.isPublic || passwordConfirm ) && 
        <>
          <GroupHeader modalIsOpenGroupsUpdateHandler={()=>setIsModalOpenUpdateForm(true)} 
                modalIsOpenGroupsDeleteHandler={()=>setIsModalOpenDeleteForm(true)}   
                sendLikeHandler={sendLikeHandler}    
                group={group}       
          />      
          <PostList group={group}  movePageHandler={movePageHandler}  />
        </>
      }


      {/* 수정하기 모달 */}
      <Modal
        isOpen={isModalOpenUpdateForm}
        appElement={document.getElementById('root')}
        onRequestClose={()=>setIsModalOpenUpdateForm(false)}
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.65)' },
          content: { 
            width: window.innerWidth <= 768 ? 'auto' : '500px',
            margin: 'auto', // 화면 중앙에 위치하도록 설정
            height: 'auto', // 필요에 따라 높이도 조절 가능
            color: 'black', 
          }
        }}
      >
        <ModalGroupsUpdateForm 
             group={group} 
             setGroup={setGroup}
            closeModalGroupsUpdateHandler={()=>setIsModalOpenUpdateForm(false)}
          />        
      </Modal>


      {/* 삭제 모달 */}
      <Modal
        isOpen={isModalOpenDeleteForm}
        appElement={document.getElementById('root')}
        onRequestClose={()=>setIsModalOpenDeleteForm(false)}
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.65)' },
          content: { 
            width: window.innerWidth <= 768 ? 'auto' : '500px',
            margin: 'auto', // 화면 중앙에 위치하도록 설정
            height: '400px', // 필요에 따라 높이도 조절 가능
            color: 'black', 
          }
        }}
      >
        <ModalGroupsDeleteForm           
            closeModalGroupsDeleteHandler={()=>setIsModalOpenDeleteForm(false)} 
            deleteSubmitHandler={deleteSubmitHandler}
        />        
      </Modal>



      {/* 알림창 컴포넌트 */}
      {isAlertOpen && (
            <CustomAlert
              title={alterTitle}
              message={alterMessage}
              onClose={()=>alertCustomHander(false)}
            />
       )}

    </>
  );
}

export default GroupsDetailPage;


export async function loader({ request, params }) {
  const { groupId } = params;
  try {
    const response = await fetch(`${API_BASE_URL}/api/groups/${groupId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok || !responseData) {   
      if (response.status === 404 || !responseData ) {
        return redirect('/Notfound'); 
      }
      throw new Error('그룹 상세 보기 API 에러');
    }

    return  {groupData:responseData};  

  } catch (error) {
    console.error("그룹 상세 보기 API 에러:", error);
    throw new Error('그룹 상세 보기 API 에러  :'+error);
  }
}
