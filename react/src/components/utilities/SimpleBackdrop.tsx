import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function SimpleBackdrop() {
  return (
    <div>
      <Backdrop sx={{ color: '#fff' }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
