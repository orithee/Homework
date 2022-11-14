import { Grid, Link, Paper } from '@mui/material';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

interface props {
  title: string;
  description: string;
  blockId: number;
  setOpenSession: Function;
}

export default function CodeCard({
  title,
  description,
  blockId,
  setOpenSession,
}: props) {
  return (
    <>
      <Grid item xs={12} md={8} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 'auto',
          }}
        >
          <Title>{title}</Title>
          <Typography component="p" variant="h6" sx={{ flex: 1 }}>
            {description}
          </Typography>
          <Link
            color="primary"
            onClick={() => setOpenSession(blockId)}
            sx={{ mt: 3, cursor: 'pointer' }}
          >
            Create a session
          </Link>
        </Paper>
      </Grid>
    </>
  );
}
