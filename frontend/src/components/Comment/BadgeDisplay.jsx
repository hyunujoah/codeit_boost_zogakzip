import React from "react";

const BadgeDisplay = ({ badge = [] }) => {
  // badge 배열이 비어 있는 경우 안전하게 처리하기 위해 기본값을 빈 배열로 설정합니다.
  
  // 각 배지 정보를 객체로 정리하여 리팩토링
  const badgeList = [
    { id: '7days', text: '💜 7일 연속 추억 등록' },
    { id: 'posts-20-register', text: '🎉 추억수 20개 이상 등록' },
    { id: 'group-1years', text: '🎂 그룹 생성후 1년 달성' },
    { id: 'group-10k-likes', text: '🏵️ 그룹 공감 1만 개 이상 받기' },
    { id: 'posts-10k-likes', text: '💖 추억 공감 1만 개 이상 받기' },
    //{ id: 'group-10-likes', text: '🪼 그룹 공감 10개 이상 받기' },
    //{ id: 'posts-10-likes', text: '🔖 추억 공감 10개 이상 받기' },
  ];

  return (
    <div>
      {/* badge 배열에 포함된 값에 따라 <span> 요소를 조건부로 표시합니다. */}
      {badgeList.map(({ id, text }) => 
        badge.includes(id) && (
          <span
            key={id}
            className="px-3 py-2 bg-gray-100 rounded-full text-gray-600 text-sm mb-2 block lg:inline"
          >
            {text}
          </span>
        )
      )}
    </div>
  );
};

export default BadgeDisplay;
