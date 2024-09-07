import React from "react";
import { Link, useRouteError } from "react-router-dom";
import PageContent from "./PageContent";

function ErrorPage() {
  const error = useRouteError();
  //console.log("error   : ", error);

  let title = "에러 발생됨!!";
  let message = "에러가 발생했습니다.";

  // Check if error exists
  if (error) {
    if (error.status === 500) {
      message = error.data?.message || "서버에 문제가 발생했습니다.";
    }

    if (error.status === 404) {
      title = (
        <div className="flex justify-center">
          <img src="/images/404.svg" alt="404 error" />
        </div>
      );
      message = (
        <>
          <h1 className="bold text-3xl text-gray-500 mt-5">찾을 수 없는 페이지 입니다.</h1>
          <p className="mt-3">요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요.</p>
        </>
      );
    }
  }else{
    title = (
      <div className="flex justify-center">
        <img src="/images/404.svg" alt="404 error" />
      </div>
    );
    message = (
      <>
        <h1 className="bold text-3xl text-gray-500 mt-5">찾을 수 없는 페이지 입니다.</h1>
        <p className="mt-3">요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요.</p>
      </>
    );
  }

  return (
    <main className="container flex justify-center items-center min-h-screen mx-auto ">
      <PageContent title={title}>
        <div>{message}</div>
        <Link to="/" className="p-5 w-100 block text-blue-500">
          홈
        </Link>
      </PageContent>
    </main>
  );
}

export default ErrorPage;
