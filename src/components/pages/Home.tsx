import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// 管理者IDのインポート
import { AdminIdTest } from '../../admin/admin';

// 機能のインポート
import { selectUserId } from '../../features/user/userSlice';

// コンポーネント
import { Header } from '../organisums/header/Header';
import { Items } from '../organisums/itemLists/Items';

export const Home = () => {
  const history = useHistory();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    // 管理者がログインした場合は、管理者画面に
    if (userId === AdminIdTest) {
      history.push('/admin');
    }
  }, [userId]);

  // テスト用
  const output = (text: string) => {
    console.log(text);
  };

  return (
    <>
      <Header></Header>
      <ContainerPadding>
        <Items outputConsole={output}></Items>
      </ContainerPadding>
    </>
  );
};

const ContainerPadding = styled.div`
  padding: 0 40px;
  margin-top: 40px;
  margin-bottom: 40px;
`;
