import { Grid, Paper } from '@mui/material';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

interface props {
  title: string;
  description: string;
  blockId: number;
}

export default function CodeCard({ title, description, blockId }: props) {
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
            height: 220,
          }}
        >
          <Title>{title}</Title>
          <Typography component="p" variant="h6" sx={{ flex: 1 }}>
            {description}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {/* {description} */}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            create a session here
          </Typography>
        </Paper>
      </Grid>
    </>
  );
}
