import React from 'react'
// 型定義
import { PrimaryButtonName } from '../../../types/buttons/primaryButton'
// import PermIdentityRoundedIcon from '@material-ui/icons/PermIdentityRounded';
import Button from '@material-ui/core/Button';

export const PrimaryButton = (props: PrimaryButtonName) => {
  const { children } = props
  return (
    <>
      <Button variant="contained">
        {children}
      </Button>
    </>
  )
}