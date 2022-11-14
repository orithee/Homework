import { Grid, Paper } from '@mui/material';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import CodeEditor from './CodeEditor';

export default function OpenBlockCode() {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

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
          <CodeEditor />
        </Paper>
      </Grid>
    </>
  );
}
