import React, { useState,useRef } from "react";
import CustomAlert from "../../components/Common/CustomAlert";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import ModalGroupPasswordInputForm from "../../components/Posts/ModalGroupPasswordInputForm";
import Modal from "react-modal";
import { API_BASE_URL } from "../../api-config";
import MyDatePicker from "../../components/Common/MyDatePicker";
import { getFormattedCurrentDate } from "../../util/customFn";



function PostsCreationFormPage() {
  const { groupData } = useRouteLoaderData("groupInfo");
  const [
    isOpenModalGroupPasswordInputForm,
    setIsOpenModalGroupPasswordInputForm,
  ] = useState(false);


  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [location, setLocation] = useState("");
  const [moment, setMoment] = useState();
  const [isPublic, setIsPublic] = useState(true);
  const [postPassword, setPostPassword] = useState("");
  const [groupPassword, setGroupPassword] = useState("");
  const [imageUploadError, setImageUploadError] = useState(false); // 이미지 업로드 오류 상태 추가
  const [tagError, setTagError] = useState(false); //태그 에러
  const createFormSubmitRef = useRef();
  const [progress, setProgress] = useState(false);

  const handleImageChange = (e) => {
    setUploadedImageUrl("");
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // 이미지 파일 상태 업데이트
      setImageUploadError(false);      
    }
  };

  const handleTagKeyDown = (e) => {
    if ((e.key === " " || e.key === "Enter") && tagInput.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageUploadError(false);
    setTagError(false);


    if (!imageFile) {
      setAlertTitle("이미지는 필수 입니다.");
      setAlertMessage("이미지 파일을 선택해 주세요.");
      setIsAlertOpen(true);
      setImageUploadError(true); // 이미지 업로드 오류 상태 설정
      return;
    }

    if(tags.length === 0){
      setAlertTitle("태그 입력 필수!");
      setAlertMessage("태그를  입력해 주세요.");
      setIsAlertOpen(true);
      setTagError(true);
      return;
    }


    if (!groupPassword) {
      setIsOpenModalGroupPasswordInputForm(true);
      return;
    }

    try {
      setProgress(true);
      let imageUrl = uploadedImageUrl;

      if (!uploadedImageUrl && imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

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
          return;
        }

        const imageResult = await imageResponse.json();
        imageUrl = imageResult.imageUrl;
        setUploadedImageUrl(imageUrl);
        //console.log("1. imageResult.imageUrl:", imageResult.imageUrl);
      }

      let momentData=moment;
      if(!moment){
        momentData=getFormattedCurrentDate();
      }

      // 2. 폼 데이터 전송
      const postsData = {
        nickname,
        title,
        content,
        postPassword,
        groupPassword,
        imageUrl,
        tags,
        location,
        moment:momentData,
        isPublic,
      };



      const postsResponse = await fetch(
        `${API_BASE_URL}/api/groups/${groupData.id}/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postsData),
        }
      );

      const postsResult = await postsResponse.json();

      if (!postsResponse.ok) {
        //console.log("추억 올리기 오류:", postsResult);
        setAlertTitle("추억 올리기 실패");
        setAlertMessage(postsResult.message);
        setIsAlertOpen(true);
        setGroupPassword("");
        return;
      }

      // 성공 알림창 표시
      setAlertTitle("추억 올리기 성공");
      setAlertMessage("성공적으로 추억 올리기를 하였습니다.");
      setUploadSuccess(true);
      setIsAlertOpen(true);
    } catch (error) {
     // console.log("추억 올리기 오류:", error);
      setAlertTitle("추억 올리기 실패");
      setAlertMessage("오류"+error.message);
      setGroupPassword("");
      setIsAlertOpen(true);
    }finally{
      setProgress(false);
    }

  };

  

  const alertCustomHandler = (value) => {
    setIsAlertOpen(value);
    if (uploadSuccess) {
      const beforePage = localStorage.getItem("beforePage");
     // const backUrl = `/groups/detail/${groupId}`;
      if (beforePage) navigate(beforePage);
      else navigate("/");
    }
  };

  return (
    <>
      <div className="w-full mx-auto p-4">
        <h2 className="text-2xl font-bold text-center mt-3 mb-5">
          추억 올리기
        </h2>

        <form onSubmit={handleSubmit}  >
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-4 lg:p-10 lg:px-32 border-b-2 lg:border-b-0 lg:border-r-2">
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
                <div className="flex items-center">
                  <input
                    type="text"
                    readOnly
                    value={imageFile ? imageFile.name : "파일을 선택해 주세요"}
                    className={`flex-grow mt-1 p-2 border rounded-l-md text-gray-600
                     ${imageUploadError ? "border-red-500" : ""} ` }
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
                  rows="5"
                  required
                  maxLength={1000}
                />
              </div>
            </div>

            <div className="lg:w-1/2 p-4 lg:p-10 lg:px-32">
              <div className="mb-4">
                <label className="block text-lg font-bold">태그</label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  className={`mt-1 p-2 w-full border rounded-md
                        ${tagError ? "border-red-500" : ""} ` }                                    
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

              <div className="mb-4">
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


              <div className="mb-4">
                <label className="block text-lg font-bold">추억의 순간</label>
                <MyDatePicker selectedDate={moment} setSelectedDate={setMoment} />
              </div>
              


              <div className="mb-4">
                <label className="block text-lg font-bold">
                  추억 공개 선택
                </label>
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
                <label className="block text-lg font-bold">비밀번호</label>
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
              ref={createFormSubmitRef}
              disable={progress}
            >
              {progress ? "진행중..." : "올리기"}
            </button>
          </div>
        </form>
      </div>

      {/* 그룹 비번 입력 모달 */}
      <Modal
        isOpen={isOpenModalGroupPasswordInputForm}
        appElement={document.getElementById("root")}
        onRequestClose={() => setIsOpenModalGroupPasswordInputForm(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.65)" },
          content: {
            width: window.innerWidth <= 768 ? "auto" : "500px",
            margin: "auto", // 화면 중앙에 위치하도록 설정
            height: "400px", // 필요에 따라 높이도 조절 가능
            color: "black",
          },
        }}
      >
        <ModalGroupPasswordInputForm
          groupId={groupData.id}
          name={groupData.name}
          closeModalGroupPasswordInputForm={() =>
            setIsOpenModalGroupPasswordInputForm(false)
          }
          setGroupPassword={setGroupPassword}
          createFormSubmitRef={createFormSubmitRef}
          
        />
      </Modal>

      {/* 알림창 컴포넌트 */}
      {isAlertOpen && (
        <CustomAlert
          title={alertTitle}
          message={alertMessage}
          onClose={() => alertCustomHandler(false)}
        />
      )}
    </>
  );
}

export default PostsCreationFormPage;
