import React from "react";

const Pagination = ({
  page, // 현재 페이지 번호
  pageSize, // 페이지 당 항목 수
  totalItems, // 전체 항목 수
  setCurrentPage, // 현재 페이지 설정 함수
  setTotalPages, // 전체 페이지 수 설정 함수
  setTotalItemCount, // 전체 항목 수 설정 함수
  url, // 데이터 가져올 URL
  params, // 추가 쿼리 파라미터
  setDataList, // 데이터 리스트 설정 함수
}) => {
  const totalPages = Math.ceil(totalItems / pageSize); // 전체 페이지 수 계산

  // 페이지 버튼의 범위를 계산합니다
  const numButtons = 5; // 보여줄 페이지 버튼의 개수
  const startPage = Math.max(1, page - Math.floor(numButtons / 2));
  const endPage = Math.min(totalPages, startPage + numButtons - 1);

  // 데이터를 가져오는 비동기 함수
  const getDataList = async (currentPage) => {
    try {
      const response = await fetch(`${url}?page=${currentPage}${params}`);
      const responseData = await response.json();

      // 데이터가 정상적으로 로드된 경우 상태를 업데이트합니다
      if (responseData) {
        setCurrentPage(responseData.currentPage);
        setTotalPages(responseData.totalPages);
        setTotalItemCount(responseData.totalItemCount);
        setDataList(responseData.data);
      }
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {/* 이전 페이지로 이동하는 버튼 */}
      {page > 1 && (
        <span
          className="mr-2 px-2 py-1 border border-gray-300 rounded cursor-pointer"
          onClick={() => getDataList(page - 1)}
        >
          이전
        </span>
      )}

      {/* 페이지 번호 버튼을 렌더링합니다 */}
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((pageNumber) => (
        <span
          key={pageNumber}
          onClick={() => getDataList(pageNumber)}
          className={`mx-1 px-2 py-1 border border-gray-300 cursor-pointer rounded ${
            pageNumber === page ? "bg-gray-300" : ""
          }`}
        >
          {pageNumber}
        </span>
      ))}

      {/* 다음 페이지로 이동하는 버튼 */}
      {page < totalPages && (
        <span
          onClick={() => getDataList(page + 1)}
          className="ml-2 px-2 py-1 border border-gray-300 rounded cursor-pointer"
        >
          다음
        </span>
      )}
    </section>
  );
};

export default Pagination;
