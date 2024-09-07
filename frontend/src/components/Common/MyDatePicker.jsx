import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import "./css/MyDatePicker.css"; // 커스텀 스타일 파일 추가

// 한국어 로케일을 등록
registerLocale("ko", ko);

// 유효한 날짜인지 확인하는 함수
const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date.getTime());
};


const MyDatePicker = ({ selectedDate, setSelectedDate }) => {
  // 유효하지 않은 날짜가 선택된 경우 현재 날짜로 초기화
  const currentDate = isValidDate(selectedDate) ? selectedDate : new Date();

  // 날짜가 변경될 때 호출되는 함수
  const handleChange = (date) => {
    if (date) {
      setSelectedDate(date); // 선택된 날짜를 상태로 설정
    }
  };

  return (
    <DatePicker
      selected={currentDate} // 선택된 날짜
      onChange={handleChange} // 날짜 변경 핸들러
      showTimeSelect // 시간 선택 허용
      timeFormat="HH:mm" // 시간 형식 설정
      timeIntervals={15} // 시간 간격(15분)
      dateFormat="yyyy.MM.dd HH:mm" // 날짜 및 시간 형식
      timeCaption="시간" // 시간 선택기 캡션
      locale="ko" // 한국어 로케일 적용
      className="custom-datepicker w-full p-2 mt-1 border rounded-md" // 커스텀 스타일 적용
      placeholderText="YYYY.MM.DD HH:MM" // 날짜 선택기 플레이스홀더
      required // 필수 입력 필드로 설정
    />
  );
};

export default MyDatePicker;
