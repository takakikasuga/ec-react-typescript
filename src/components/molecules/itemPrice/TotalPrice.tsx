import React, { memo } from 'react';
import styled from 'styled-components';

export const TotalPrice = memo((props: { totoalPrice: number }) => {
  const { totoalPrice } = props;
  return (
    <Container>
      <h4>総合計金額（税込）</h4>
      <p>{Number(totoalPrice).toLocaleString()}円(税込）</p>
    </Container>
  );
});

// スタイルコンポーネント
const Container = styled.div`
  color: red;
`;
