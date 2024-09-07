import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

//샘플 테스트
const fetchUsers = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
};

function UserList() {
  // useQuery 훅을 사용해 데이터 페칭
  const { data, error, isLoading } = useQuery(['users'], fetchUsers);

  if (isLoading) return <div>Loading...</div>; // 로딩 중일 때 표시할 UI
  if (error) return <div>Error: {error.message}</div>; // 오류 발생 시 표시할 UI

  return (
    <div>
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
