import React, { useState } from "react";
import MyDatePicker from "../Common/MyDatePicker";
import { API_BASE_URL } from "../../api-config";
import CustomAlert from "../Common/CustomAlert";


function ModalPostsUpdateForm({
  closeModalMomoryUpdateHandler,
  post,
  setPost
}) {
  const [nickname, setNickname] = useState(post.nickname);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);
  const [tags, setTags] = useState(post.tags);
  const [tagInput, setTagInput] = useState(""); // 태그 입력 상태 추가
  const [location, setLocation] = useState(post.location);
  const [moment, setMoment] = useState(post.moment);
  const [isPublic, setIsPublic] = useState(post.isPublic==="true"?true:false);
  const [postPassword, setPostPassword] = useState("");

  const [isAlertOpen, setIsAlertOpen] = useState(false); 
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");


  const [currentImageUrl, setCurrentImageUrl] = useState(post.imageUrl);
  const [fileName, setFileName] = useState(""); // 파일명 상태 추가
  const [imageFile, setImageFile] = useState(null); // 실제 이미지 파일 상태
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageUploadError, setImageUploadError] = useState(false); // 이미지 업로드 오류 상태 추가




  const handleImageChange = (e) => {
    setUploadedImageUrl("");
    setImageUploadError(false); // 새로운 파일 선택 시 오류 상태 초기화
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // 파일명 상태 업데이트
      setImageFile(file); // 이미지 파일 상태 업데이트
    }
  };

  const handleTagKeyDown = (e) => {
    if ((e.key === " " ||e.key === "Enter") && tagInput.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput(""); // 입력 후 태그 입력란 초기화
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     const getImageUrl =await imageUpload();
     if(!getImageUrl) return;


     const postsData = {     
      nickname,
      title,
      content,
      postPassword,
      imageUrl:getImageUrl,
      tags,
      location,
      moment,
      isPublic,      
    };


       const response = await fetch(`${API_BASE_URL}/api/posts/${post.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(postsData),
      });

       const responseData = await response.json();
       //console.log("3. 전송 결과:", responseData);

      if(!response.ok) {
         // console.log("추억 수정하기 오류:");
          setAlertTitle("추억 수정하기  실패");
          setAlertMessage(responseData.message);
          setIsAlertOpen(true);
          if(responseData.message==="이미 존재재하는 그룹입니다"){
            setGroupNameError(true);
          }        
          return;
       }

        // 성공 알림창 표시
        setPost(responseData);
        setAlertTitle("추억 수정하기 성공");
        setAlertMessage("추억이 성공적으로 수정 되었습니다.");
        setIsAlertOpen(true);                    
  };


  const imageUpload=async ()=>{
       // 1. 이미지 업로드
    let imageUrl = uploadedImageUrl;
    if (imageFile!==null&&!uploadedImageUrl) {

      const formData = new FormData();
      formData.append("image", imageFile);

      //console.log("=======================>이미지 업로드 처리!!!");
      const imageResponse = await fetch(`${API_BASE_URL}/api/image`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!imageResponse.ok) {
        setAlertTitle("이미지 업로드 실패");
        setAlertMessage("이미지 업로드에 실패했습니다.");
        setIsAlertOpen(true);
        setImageFile(null);
        setFileName("");
        setImageUploadError(true); // 이미지 업로드 오류 상태 설정
        return false;
      }
      const imageResult = await imageResponse.json();
      imageUrl = imageResult.imageUrl;
      setUploadedImageUrl(imageUrl);
      //console.log("1. imageResult.imageUrl:", imageResult.imageUrl);
    }

    if(!imageUrl)imageUrl=currentImageUrl;
    setImageUrl(imageUrl);
    return imageUrl;
  }


  const buttonResultHandler = () => {
    setIsAlertOpen(false);
    if (alertTitle === "추억 수정하기 성공") {
      closeModalMomoryUpdateHandler();           
    }
  };


  return (

    <>
    <div className="w-full mx-auto p-4">
      <h2 className="text-xl lg:text-2xl font-bold text-center mt-3 mb-5">추억 올리기</h2>
      <span
        className="absolute top-5 right-7 text-2xl lg:text-3xl cursor-pointer"
        onClick={closeModalMomoryUpdateHandler}
      >
        x
      </span>
      <form onSubmit={handleSubmit} method="post">
        <div className="flex flex-col lg:flex-row ">
          <div className="lg:w-1/2 p-1 lg:p-10 lg:px-32 border-b-2 lg:border-b-0 lg:border-r-2">   
          
            <div className="mb-4">
              <label className="block text-lg font-bold">닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="닉네임을 입력해 주세요"
                required
                maxLength={20}
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-bold">제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="제목을 입력해 주세요"
                required
                maxLength={30}
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-bold">이미지</label>

              {!fileName&&<div className="w-36  rounded-lg overflow-hidden  p-0 m-auto mb-2 relative">
              <img
                src={`${API_BASE_URL}${currentImageUrl}`}
                alt="Group"
                className="object-cover " 
                          
              />
              </div>
             }    

              <div className="flex items-center">
              <input
                    type="text"
                    readOnly
                    value={fileName && fileName.length > 0 ? fileName : "파일을 선택해 주세요"}
                    className={`flex-grow mt-1 p-2 border rounded-l-md text-gray-600 ${
                      imageUploadError ? "border-red-500" : ""
                    }`}
                    required
              />
                <label className="flex-shrink-0">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <span className="cursor-pointer inline-block mt-1 p-2 ml-3 text-gray-900 border rounded-r-md hover:bg-gray-300">
                    파일 선택
                  </span>


                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-lg font-bold">본문</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="본문 내용을 입력해 주세요"
                rows="7"
                required
                maxLength={1000}
              />
            </div>
          </div>

          <div className="lg:w-1/2 p-4 lg:p-10 lg:px-32">
          
          
            <div className="mb-10">
              <label className="block text-lg font-bold">태그</label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="태그를 입력해 주세요."
              />
              <div className="mt-3 flex flex-wrap">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full flex items-center mr-2 mb-2"
                  >
                    <span className="mr-2">#{tag}</span>
                    <button
                      type="button"
                      className="text-gray-600 hover:text-gray-900"
                      onClick={() => removeTag(tag)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>



            <div className="mb-10">
              <label className="block text-lg font-bold">장소</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="장소를 입력해 주세요"
                required
                maxLength={30}
              />
            </div>

            
            <div className="mb-10">
                <label className="block text-lg font-bold">추억의 순간</label>
                <MyDatePicker selectedDate={moment} setSelectedDate={setMoment} />
            </div>
              



            <div className="mb-10">
              <label className="block text-lg font-bold">추억 공개 선택</label>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer mt-3">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="sr-only peer"                    
                  />
                  <span className="mr-5 text-gray-900">
                    {isPublic ? "공개" : "비공개"}
                  </span>
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-gray-950 peer-focus:ring-4 peer-focus:ring-gray-300 peer-focus:outline-none transition-all duration-200 ease-in-out">
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                        isPublic ? "translate-x-5" : ""
                      }`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-lg font-bold">수정 권한 인증</label>
              <input
                type="password"
                value={postPassword}
                onChange={(e) => setPostPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="비밀번호를 입력해 주세요"
                required
              />
            </div>
          </div>
       
       
       
        </div>

        <div className="flex justify-center items-center mt-16">
          <button
            type="submit"
            className="w-full lg:w-1/3 bg-gray-950 text-white py-3 px-5 rounded-md hover:bg-gray-800 hover:text-white"
          >
            수정하기
          </button>
        </div>
      </form>
    </div>
 {/* 알림창 컴포넌트 */}
 {isAlertOpen && (
  <CustomAlert
    title={alertTitle}
    message={alertMessage}
    onClose={buttonResultHandler}
  />
)}

</>
  );
}

export default ModalPostsUpdateForm;
