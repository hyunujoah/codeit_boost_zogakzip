import React, { useState } from "react";
import CustomAlert from "../../components/Common/CustomAlert";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api-config";

function GroupCreationFormPage() {
  const [groupName, setGroupName] = useState("");
  const [groupNameError, setGroupNameError] = useState(false); 
  const [groupNameErrorMessage, setGroupNameErrorMessage] = useState("");

  const [fileName, setFileName] = useState(""); // 파일명 상태 추가
  const [imageFile, setImageFile] = useState(null); // 실제 이미지 파일 상태
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageUploadError, setImageUploadError] = useState(false); // 이미지 업로드 오류 상태 추가

  const [introduction, setIntroduction] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");

  const navigator = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const allowedSpecialChars = /^[a-zA-Z0-9가-힣!@#$%^_]+$/;

  const [progress, setProgress] = useState(false);


  const handleGroupNameChange = (e) => {
    const value = e.target.value;
    setGroupName(value);
    setGroupNameError(false);
    
    if (!allowedSpecialChars.test(value)) {
      setGroupNameError(true);
      setGroupNameErrorMessage("특수문자는 !@#$%^_만 사용하실 수 있습니다.");
    } else {
      setGroupNameError(false);
      setGroupNameErrorMessage("");
    }
  };



  const handleImageChange = (e) => {
    setUploadedImageUrl("");
    setImageUploadError(false); // 새로운 파일 선택 시 오류 상태 초기화
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // 파일명 상태 업데이트
      setImageFile(file); // 이미지 파일 상태 업데이트
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGroupNameError(false);
    
    if (!imageFile) {
      setAlertTitle("이미지는 필수 입니다.");
      setAlertMessage("이미지 파일을 선택해 주세요.");
      setIsAlertOpen(true);
      setImageUploadError(true); // 이미지 업로드 오류 상태 설정
      return;
    }

    
    if (!allowedSpecialChars.test(groupName)) {
      setGroupNameError(true);
      setGroupNameErrorMessage("특수문자는 !@#$%^_만 사용하실 수 있습니다.");
      setAlertTitle("그룹명 오류");
      setAlertMessage("특수문자는 !@#$%^_만 사용하실 수 있습니다.");
      setIsAlertOpen(true);
      return;
    }


    try {
      setProgress(true);
      // 1. 이미지 업로드
      let imageUrl = uploadedImageUrl;

      if (!uploadedImageUrl) {
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
          setImageFile(null);
          setFileName("");
          setImageUploadError(true); // 이미지 업로드 오류 상태 설정
          return;
        }

        const imageResult = await imageResponse.json();
        imageUrl = imageResult.imageUrl;
        setUploadedImageUrl(imageUrl);
        //console.log("1. imageResult.imageUrl:", imageResult.imageUrl);
      }

      // 2. 폼 데이터 전송
      const groupData = {
        name: groupName,
        password: password,
        imageUrl: imageUrl,
        isPublic: isPublic,
        introduction: introduction,
      };

      //console.log("2. 폼 데이터 전송:", groupData);

      const groupResponse = await fetch(`${API_BASE_URL}/api/groups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(groupData),
      });

      const groupResult = await groupResponse.json();
     // console.log("3. 전송 결과:", groupResponse);

      if (!groupResponse.ok) {
      // console.log("그룹 만들기 오류:", groupResult);
        setAlertTitle("그룹 만들기 실패");
        setAlertMessage(groupResult.message);
        setIsAlertOpen(true);
        if(groupResult.message==="이미 존재재하는 그룹입니다"){
          setGroupNameError(true);
        }        
        return;
      }

      // 성공 알림창 표시
      setAlertTitle("그룹 만들기 성공");
      setAlertMessage("그룹이 성공적으로 만들어졌습니다.");
      setIsAlertOpen(true);

    } catch (error) {
      console.log("그룹 만들기 오류:", error);
      setAlertTitle("그룹 만들기 실패");
      setAlertMessage(error.message);
      setIsAlertOpen(true);
    }finally{

      setProgress(false);
    }

    
  };

  const buttonResultHandler = () => {
    setIsAlertOpen(false);
    if (alertTitle === "그룹 만들기 성공") {
      navigator("/groups");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mt-3 mb-5">그룹 만들기</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-12">
          <label className="block text-lg font-bold text-gray-950">
            그룹명
          </label>
          <input
            type="text"
            value={groupName}
            onChange={handleGroupNameChange}
            className={`mt-1 p-2 w-full border rounded-md ${groupNameError ? "border-red-500" : ""}` }
            placeholder="그룹명을 입력하세요"
            required
            maxLength={35}
          />

           {groupNameError && (
            <p className="text-red-500 text-sm mt-1">{groupNameErrorMessage}</p>
          )}
        </div>

        <div className="mb-12">
          <label className="block text-lg font-bold text-gray-950">
            대표 이미지
          </label>
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

        <div className="mb-12">
          <label className="block text-lg font-bold text-gray-950">
            그룹 소개
          </label>
          <textarea
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="그룹을 소개해 주세요"
            rows="5"
            required
            maxLength={200}
          />
        </div>

        <div className="mb-12">
          <label className="block text-lg font-bold text-gray-950">
            그룹 공개 선택
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

        <div className="mb-12">
          <label className="block text-lg font-bold text-gray-950">
            비밀번호 생성
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="그룹 비밀번호를 생성해 주세요"
            required
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-gray-950 text-white py-3 px-5 rounded-md hover:bg-gray-800 hover:text-white"
            disabled={progress}
          >
            {progress ? "등록중..." : "만들기"}
          </button>
        </div>
      </form>

      {/* 알림창 컴포넌트 */}
      {isAlertOpen && (
        <CustomAlert
          title={alertTitle}
          message={alertMessage}
          onClose={buttonResultHandler} // 알림창 닫기 위한 핸들러
        />
      )}
    </div>
  );
}

export default GroupCreationFormPage;
