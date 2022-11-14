import { Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { globalState } from '../redux/store';
import Editor from './Editor';

export default function OpenBlockCode() {
  const user = useSelector((state: globalState) => state.global.user);

  return (
    <>
      <Grid item xs={12} md={4} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '78vh',
            maxHeight: '70%',
          }}
        >
          <Editor readOnly={user?.isStudent ? false : true} />
        </Paper>
      </Grid>
    </>
  );
}
