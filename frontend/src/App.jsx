import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ErrorPage from "./pages/ErrorPage.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import GroupCreationFormPage from "./pages/Groups/GroupCreationFormPage.jsx";
import GroupsLayout from "./pages/Groups/GroupsLayout.jsx";
import GroupListPage from "./pages/Groups/GroupListPage.jsx";
import GroupsDetailPage, { loader as groupsDetailLoader } from "./pages/Groups/GroupsDetailPage.jsx";
import PostsCreationFormPage from "./pages/Posts/PostsCreationFormPage.jsx";
import PostsLayout from "./pages/Posts/PostsLayout.jsx";
import PostsDetailPage, { loader as postsDetailLoader } from "./pages/Posts/PostsDetailPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    errorElement: <ErrorPage />,
    children: [
      { 
        index: true,
        element: <GroupListPage />
      },
      {
        path: "groups",
        element: <GroupsLayout />,
        children: [
          { 
            index: true, 
            element: <GroupListPage /> 
          },
          {
            path: "create",
            element: <GroupCreationFormPage />,
          },
          {
            path: "releaseGroup",
            element: <GroupListPage />,
          },
          {
            path: "privateGroup",
            element: <GroupListPage />,
          },
          {
            path: "detail",
            children: [
              {
                path: ":groupId",
                id: "groupData",
                element: <GroupsDetailPage />,
                loader: groupsDetailLoader,
              },
            ],
          },
        ],
      },
      {
        path: "posts",
        element: <PostsLayout />,
        children: [
          {
            path: ":groupId/create",
            id: "groupInfo",
            element: <PostsCreationFormPage />,
            loader: groupsDetailLoader,
          },
          {
            path: "detail",
            children: [
              {
                path: ":postId",
                id: "postData",
                element: <PostsDetailPage />,
                loader: postsDetailLoader,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "Notfound",
    element: <NotFoundPage />,
  },
]);

// 로딩 스피너 컴포넌트 정의
function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="spinner-border animate-spin inline-block w-24 h-24 border-4 rounded-full text-blue-600"></div>
      <h1 className="text-center mt-4 text-lg">로딩중...</h1>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />
    </QueryClientProvider>
  );
}

export default App;
