import { format } from "date-fns";

export const comma = (value) => {
    let price = String(value);
    price = Number(price.replace(',', ''));
    if (isNaN(price)) {
        return 0;
    } else {
        return price.toLocaleString('ko-KR');
    }
};

// 날짜 형식 변환 함수
export const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };

    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', options).replace(/\. /g, '-').replace(' ', 'T');
};


 
export const calculateDaysPassedOne = (isoDate) => {
    // 주어진 ISO 형식의 날짜를 Date 객체로 변환
    const givenDate = new Date(isoDate);
  
    // 입력된 날짜가 유효한지 확인
    if (isNaN(givenDate.getTime())) {
      console.error('유효하지 않은 날짜:', isoDate);
      throw new Error('유효하지 않은 날짜');
    }
  
    // 오늘 날짜 가져오기
    const today = new Date();
  
    // 오늘 날짜와 주어진 날짜의 차이를 계산 (밀리초 단위)
    const timeDiff = today - givenDate;
  
    // 밀리초를 일수로 변환
    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
    // "D+X" 형식으로 반환
    return `D+${daysPassed}`;
};
  

export const calculateDaysPassed = (isoDate) => {
  // 주어진 ISO 형식의 날짜를 Date 객체로 변환
  const givenDate = new Date(isoDate);
  
  // 입력된 날짜가 유효한지 확인
  if (isNaN(givenDate.getTime())) {
    console.error('유효하지 않은 날짜:', isoDate);
    throw new Error('유효하지 않은 날짜');
  }

  // 오늘 날짜 가져오기
  const today = new Date();
  
  // 주어진 날짜와 오늘 날짜의 UTC 시간을 가져오기
  const givenDateUTC = Date.UTC(givenDate.getUTCFullYear(), givenDate.getUTCMonth(), givenDate.getUTCDate());
  const todayUTC = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());

  // UTC 시간을 기준으로 차이를 계산 (밀리초 단위)
  const timeDiff = todayUTC - givenDateUTC;

  // 밀리초를 일수로 변환
  const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  // "D+X" 형식으로 반환
  return `D+${daysPassed}`;
};


/////////////그룹 더미데이터 생성////////////////
// 랜덤 날짜를 생성하는 함수
export const getRandomPastDate = () => {
    // 현재 날짜를 기준으로 랜덤한 날짜를 생성
    const today = new Date();
    const daysAgo = Math.floor(Math.random() * 365); // 최대 1년 전 날짜
  
    // 현재 날짜에서 daysAgo일을 빼서 랜덤한 날짜 생성
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - daysAgo);
  
    // ISO 문자열로 포맷
    return pastDate.toISOString();
  };
  
  // 더미 데이터 생성 함수
  const generateRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const generateDummyGroups = (count, isPublic) => {
      const nameTemplates = [
          `${isPublic ? '' : '비공개 ' }Group`,
          `${isPublic ? '' : '비공개 ' }Team`,
          `${isPublic ? '' : '비공개 ' }Club`,
          `${isPublic ? '' : '비공개 ' }Community`
      ];
  
      const introductionTemplates = [
          '여기는 놀라운 그룹입니다!',
          '이곳은 여러분을 위한 장소입니다.',
          '모임에 오신 것을 환영합니다!',
          '커뮤니티에서 새로운 경험을 쌓으세요.'
      ];
  
      return Array.from({ length: count }, (_, index) => ({
          id: (Math.random() * 100000000).toFixed(0),
          name: `${generateRandomElement(nameTemplates)} ${index + 1}`,
          imageUrl: `https://picsum.photos/336?random=${Math.floor(Math.random() * 1000)}`,
          isPublic: isPublic,
          likeCount: Math.floor(Math.random() * 100),
          badgeCount: Math.floor(Math.random() * 10),
          postCount: Math.floor(Math.random() * 50),
          createdAt: getRandomPastDate(),
          introduction: `${generateRandomElement(introductionTemplates)} ${index + 1}`,
      }));
  };
  


//////////////////////////////////추억 더미데이터/////////////////
// 랜덤 날짜를 생성하는 함수
export const getPostRandomPastDate = () => {
    const today = new Date();
    const daysAgo = Math.floor(Math.random() * 365); // 최대 1년 전 날짜
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - daysAgo);
    return pastDate.toISOString();
};
  
  // 더미 데이터 생성 함수
export const generatePostRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
export const generatePostDummyPosts = (count, isPublic) => {
    const titleTemplates = [
      '에델바이스 꽃말이 소중한 추억',
      '인천 앞바다에서의 낚시 이야기',
      '어린 시절의 추억',
      '한여름 밤의 꿈같은 추억',
      '가족과 함께한 즐거운 시간'
    ];
  
    const contentTemplates = [
      '여기는 소중한 추억을 기록하는 곳입니다.',
      '우리의 기억을 함께 나누어요.',
      '이곳에서 당신의 이야기를 들려주세요.',
      '추억을 남겨보세요.',
      '이곳에서 함께 이야기해요.'
    ];
  
    const locationTemplates = [
      '인천',
      '서울',
      '부산',
      '대구',
      '제주'
    ];
  
    const tagTemplates = [
      '#태그 #추억 #여행',
      '#기억 #사랑 #우정',
      '#가족 #행복 #기록',
      '#친구 #소중한 #시간',
      '#여행 #사진 #이야기'
    ];
  
    return Array.from({ length: count }, (_, index) => ({
      id: (Math.random() * 100000000).toFixed(0),
      groupId: Math.floor(Math.random() * 10) + 1, // 랜덤 그룹 ID
      nickname: `User${index + 1}`,
      postPassword: '1111',
      title: `${generatePostRandomElement(titleTemplates)}`,
      content: `${generatePostRandomElement(contentTemplates)}`,
      imageUrl: `https://picsum.photos/336?random=${Math.floor(Math.random() * 1000)}`,
      tags: generatePostRandomElement(tagTemplates),
      location: generatePostRandomElement(locationTemplates),
      moment: getPostRandomPastDate().substring(0, 10), // 날짜 형식에 맞게
      //isPublic: Math.random() > 0.5, // 랜덤으로 공개 여부 결정
      isPublic:isPublic,
      likeCount: Math.floor(Math.random() * 100),
      commentCount: Math.floor(Math.random() * 50),
      createdAt: getPostRandomPastDate(),
    }));
  };
  

 
export const sortPostPosts = (filteredPosts, sortOption) => {

  
  // 원본 배열을 복사한 후 정렬
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOption === "likeCount") {
      return b.likeCount - a.likeCount;

    } else if (sortOption === "createdAt") {
      return new Date(b.createdAt) - new Date(a.createdAt);

    } else if (sortOption === "commentCount") {
      return b.commentCount - a.commentCount;

    } else {
      return b.id - a.id;
    }
  });

  return sortedPosts; // 정렬된 배열 반환
};




// 새로운 형식으로 변환하는 함수
export function formatMoment(moment) {
  const date = new Date(moment);
  
  // 두 자리수로 만들기 위한 함수
  const pad = (n) => n < 10 ? '0' + n : n;

  // 연도, 월, 일, 시간, 분 추출
  const year = date.getFullYear().toString().slice(2); // 연도의 마지막 두 자리
  const month = pad(date.getMonth() + 1); // 월 (0부터 시작하므로 1 더함)
  const day = pad(date.getDate()); // 일
  const hours = pad(date.getHours()); // 시간
  const minutes = pad(date.getMinutes()); // 분

  // 형식에 맞게 반환
  return `${year}.${month}.${day} ${hours}:${minutes}`;
}


export function convertNewlinesToBr(text) {
  if (!text) return '';
  return text.replace(/\n/g, '<br>');
}

// 이미지 오류 처리 함수
export const randomImage = (size=336) => {
  return `https://picsum.photos/${size}?random=${Math.floor(Math.random() * 1000)}`;
  
};



export const getFormattedCurrentDate = () => {
  const now = new Date(); // 현재 날짜와 시간 가져오기
  return format(now, "yyyy.MM.dd HH:mm"); // 원하는 형식으로 포맷팅
};


/**
 * 숫자를 1k, 1.5k 등의 형식으로 변환하는 함수
 * @param {number} number - 변환할 숫자
 * @returns {string} - 변환된 문자열
 */
export const KformatNumber = (number) => {
  if (number < 1000) {
    return number.toString(); // 1000 미만은 숫자 그대로 반환
  } else if (number < 10000) {
    // 1000 이상 10000 미만은 소수점 한 자리까지 표시
    return `${(number / 1000).toFixed(1)}k`;
  } else {
    // 10000 이상은 정수형 표시
    return `${Math.round(number / 1000)}k`;
  }
};
