import React from 'react';
// 型定義
import { PrimaryButtonName } from '../../../types/buttons/primaryButton';

// コンポーネント
import Button from '@material-ui/core/Button';

export const PrimaryButton = (props: PrimaryButtonName) => {
  const { children } = props;
  return (
    <>
      <Button variant='contained'>{children}</Button>
    </>
  );
};
