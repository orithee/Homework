import { Grid, Paper } from '@mui/material';
import { StudentsType } from '../helpers/types';
import Title from './utilities/Title';

interface props {
  student: StudentsType;
}

// A component that displays a description of an exercise inside a card:
export default function StudentCard({ student }: props) {
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
          <Title>{student.name}</Title>
          <Title>{student.password}</Title>
        </Paper>
      </Grid>
    </>
  );
}
