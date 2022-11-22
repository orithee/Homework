import { Grid, Link, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Title from './utilities/Title';

interface Props {
  title: string;
  description: string;
  blockId: number;
  setOpenSession: Function;
}

// A component that displays a description of an exercise inside a card:
export default function CodeCard(props: Props) {
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
          <Title>{props.title}</Title>
          <Typography component="p" variant="h6" sx={{ flex: 1 }}>
            {props.description}
          </Typography>
          <Link
            color="primary"
            onClick={() => props.setOpenSession(props.blockId)}
            sx={{ mt: 3, cursor: 'pointer' }}
          >
            Create a session
          </Link>
        </Paper>
      </Grid>
    </>
  );
}
