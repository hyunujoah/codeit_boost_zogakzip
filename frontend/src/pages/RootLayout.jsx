import React from 'react';
import { Outlet, useLoaderData, useLocation } from 'react-router-dom';

import ScrollTop from '../components/ScrollTop';
import Header from '../components/Header';

// Root 레이아웃 컴포넌트
function RootLayout() {
  const token = useLoaderData(); // 토큰 로딩
  const location = useLocation(); // 현재 위치
  //console.log("1.location : ", location, "2.token : ", token);

  return (
    <>
    <div className='max-w-screen-2xl mx-auto relative '>
       <Header />
      <main>        
        <Outlet />      
      </main>  
      {/* 스크롤 최상단으로 이동하는 컴포넌트 */}
      <ScrollTop />
    </div>     
    </>
  );
}



export default RootLayout;
