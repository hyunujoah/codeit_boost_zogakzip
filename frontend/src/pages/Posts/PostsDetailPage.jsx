import React, { useEffect, useState } from 'react'
import PostsDetailHead from '../../components/Posts/PostsDetailHead'
import PostsDetailCenter from '../../components/Posts/PostsDetailCenter'
import CommentList from '../../components/Comment/CommentList'
import { useLocation, useNavigate, useParams, useRouteLoaderData } from 'react-router-dom'
import AuthPostsPassword from '../../components/Posts/AuthPostsPassword'
import CustomAlert from '../../components/Common/CustomAlert'
import ModalPostsUpdateForm from '../../components/Posts/ModalPostsUpdateForm'
import ModalPostsDeleteForm from '../../components/Posts/ModalPostsDeleteForm'
import Modal from 'react-modal';
import ModalCommentCreationForm from '../../components/Comment/ModalCommentCreationForm'
import { API_BASE_URL } from '../../api-config'


const PostsDetailPage = () => {
  const navigate = useNavigate();
  const {postsData} =useRouteLoaderData("postData");
  const [post, setPost] = useState(postsData);

  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false); 
  const [alterTitle, setAlterTitle] = useState("");
  const [alterMessage, setAlterMessage] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  //추억수정모달
  const [isModalOpenUpdateForm, setIsModalOpenUpdateForm] = useState(false);
  //추억삭제모달
  const [isModalOpenDeleteForm, setIsModalOpenDeleteForm] = useState(false);

  //댓글등록모달
  const [isCommentModalOpenCreateForm, setIsCommentModalOpenCreateForm] = useState(false);

  //댓글 상태 변경감지
  const [commentState, setCommentState] = useState(false);

  const postsPasswordConfirmHandler = async (password) => {    
    const response=await fetch(`${API_BASE_URL}/api/posts/${post.id}/verify-password`, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({password}),
    });

    const responseData=await response.json();

    if(!response.ok || (responseData.message!=="비밀번호가 확인되었습니다" )) {
      //알림창
      setAlterTitle("비공개 추억 접근 실패");    
      setAlterMessage("비밀번호가 일치하지 않습니다.");
      setIsAlertOpen(true);
      return;
    }
    setPasswordConfirm(true);

  };


    //추억삭제 처리
    const deleteSubmitHandler =async (password) => {
         // console.log("업데이트 삭제 처리 :",password);
          const response=await fetch(`${API_BASE_URL}/api/posts/${post.id}`, {
              method:"delete",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({postPassword:password}),
          });

          const responseData=await response.json();
          if(!response.ok) {        
            if(responseData.message==="비밀번호가 틀렸습니다" ){
                setAlterTitle("추억 삭제 실패");    
                setAlterMessage("비밀번호가 틀렸습니다.");  
                setIsAlertOpen(true);
                return;
            }
            setAlterTitle("추억 삭제 실패");    
            setAlterMessage("추억 삭제에 실패하였습니다.");
            setIsAlertOpen(true);    
            return;
          }
          setAlterTitle("추억 삭제 성공");    
          setAlterMessage("추억 삭제에 성공하였습니다.");
          setDeleteSuccess(true);     
          setIsModalOpenDeleteForm(false);
          alertCustomHander(true);       
    }




  const alertCustomHander = (value) => {      
    setIsAlertOpen(value); 
      if(deleteSuccess){             
      const beforePage = localStorage.getItem("beforePage");
      if(beforePage)navigate(beforePage);
      else  navigate("/");
      }
  }



  return (
    <>    
      { post.isPublic==="false" && !passwordConfirm && <AuthPostsPassword postsPasswordConfirmHandler={postsPasswordConfirmHandler} />}

      { (post.isPublic || passwordConfirm )      
        &&
        <> 
        <PostsDetailHead 
            modalIsOpenPostsUpdateHandler={()=>setIsModalOpenUpdateForm(true)}
            modalIsOpenPostsDeleteHandler={()=>setIsModalOpenDeleteForm(true)}
            post={post}
            setPost={setPost}
        />
        
        <PostsDetailCenter modalIsOpenCommentCreateHandler={()=>setIsCommentModalOpenCreateForm(true)} post={post}/>

        <CommentList  post={post} commentState={commentState} setCommentState={setCommentState} />
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
            width: window.innerWidth <= 768 ? '100%' : '70%',            
            margin: window.innerWidth <= 768 ? 'auto' : 'auto',
            left: window.innerWidth <= 768 ? '0' : '0',
            height: '85%',
            color: 'black', 
          }
        }}
      >
        <ModalPostsUpdateForm 
            closeModalMomoryUpdateHandler={()=>setIsModalOpenUpdateForm(false)}         
            post={post}
            setPost={setPost}
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
            maxWidth: '500px', // 원하는 넓이로 설정
            margin: 'auto', // 화면 중앙에 위치하도록 설정
            height: '400px', // 필요에 따라 높이도 조절 가능
            color: 'black', 
          }
        }}
      >
        <ModalPostsDeleteForm 
          closeModalPostsDeleteHandler={()=>setIsModalOpenDeleteForm(false)} 
          deleteSubmitHandler={deleteSubmitHandler}           
        />        
      </Modal>



      {/* //////////////////////////////////////////// */}
      {/* 댓글 등록 모달 */}
      <Modal
        isOpen={isCommentModalOpenCreateForm}
        appElement={document.getElementById('root')}
        onRequestClose={() => setIsCommentModalOpenCreateForm(false)}
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.65)' },
          content: {            
            maxWidth:"500px",
            margin: 'auto', // 화면 중앙에 위치하도록 설정
            height: window.innerWidth <= 768 ? '80%' : '60%',
            color: 'black', 
          }
        }}
      >

        <ModalCommentCreationForm 
            closeModalCommentCreateHandler={() => setIsCommentModalOpenCreateForm(false)}
            post={post}  
            setCommentState={setCommentState}
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
  )

}

export default PostsDetailPage;


export async function loader({ request, params }) {
  const {postId} =params;

  try {
    const response = await fetch(`${API_BASE_URL}/api/posts/${postId}`, {
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
      throw new Error('추억 상세 보기 API 에러');
    }

    //console.log("  추억 상세 데이터 :",responseData);
    return  {postsData:responseData};  

  } catch (error) {
    //console.error("추억 상세 보기 API 에러:", error);
    throw new Error('추억 상세 보기 API 에러  :'+error);
  }
}