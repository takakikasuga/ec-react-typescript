import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setItemCount } from '../../../features/itemCount/itemCountSlice';

// マテリアルUI
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    borderLine: {
      border: '1px solid #000',
    },
  })
);
export const ItemCount = (props: any) => {
  const { children } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState<number | string>('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    // useState内部で扱うとエラーが起きるので、一度変数に入れてから対応
    const selectedItemCount = Number(event.target.value);
    setCount(Number(event.target.value));
    dispatch(setItemCount(selectedItemCount));
    // 下記を実行するとエラーが生じる
    // setCount(Number(event.target.value) || '');
    // setCount((pre: number | string) => {
    //   dispatch(setItemCount(Number(pre)))
    //   return pre
    // })
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // セレクトボックスのもエラーはマテリアルUIの問題
  // https://teratail.com/questions/249414

  return (
    <div>
      <Button
        data-testid='itemCountTest'
        className={classes.borderLine}
        onClick={handleClickOpen}>
        {children}
      </Button>
      <span>：{Number(count)}個</span>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}>
        <DialogTitle data-testid='itemCountTestSuprise'>
          個数を選択してください。
        </DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel
                data-testid='itemCountTestNumber'
                id='demo-dialog-select-label'>
                ItemCount
              </InputLabel>
              <Select
                labelId='demo-dialog-select-label'
                id='demo-dialog-select'
                value={count}
                onChange={(e) => {
                  handleChange(e);
                }}
                input={<Input />}>
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary'>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
