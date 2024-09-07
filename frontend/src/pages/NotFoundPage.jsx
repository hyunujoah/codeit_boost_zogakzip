import React from 'react'
import PageContent from './PageContent'
import { Link } from 'react-router-dom';

function NotFoundPage() {

    let title = <>
    <div className="flex justify-center">
      <img src="/images/404.svg" alt="404 error" />
    </div>
  </>;
  let message = <>
    <h1 className="bold text-3xl text-gray-500 mt-5">찾을 수 없는 페이지 입니다.</h1>
    <p className="mt-3">요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요.</p>
  </>;


  return (
    <>
    <main className="container flex justify-center items-center min-h-screen  mx-auto ">
      <PageContent title={title}>
        <div>{message}</div>
        <Link to={"/"} className="p-5 w-100  block text-blue-500">홈</Link>
      </PageContent>
    </main>
  </>
  )
}

export default NotFoundPage