import { Button, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UpdateLinks } from '../redux/globalSlice';
import { globalState } from '../redux/store';
import SimpleBackdrop from './utilities/SimpleBackdrop';
import Title from './utilities/Title';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CurrentSession() {
  const links = useSelector((state: globalState) => state.global.sessionLinks);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const closeSession = async () => {
    setLoader(true);
    try {
      const res = await axios.put('/delete-session');
      if (res.data.success) dispatch(UpdateLinks({ student: '', mentor: '' }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <Modal
        open={true}
        onClose={() => console.log(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loader && <SimpleBackdrop />}
          <Title>Links to the current session:</Title>
          <Divider sx={{ margin: '2%' }} />
          <div>Student link:</div>
          <Link
            color="primary"
            onClick={() =>
              window.open(links.student, '_blank', 'noopener,noreferrer')
            }
            to={''}
          >
            {links.student}
          </Link>
          <Divider sx={{ margin: '2%' }} />
          <div>Mentor link:</div>
          <Link
            color="primary"
            onClick={() =>
              window.open(links.mentor, '_blank', 'noopener,noreferrer')
            }
            to={''}
          >
            {links.mentor}
          </Link>
          <Divider sx={{ margin: '2%' }} />
          <Button
            sx={{ marginTop: '2%' }}
            onClick={() => closeSession()}
            variant="outlined"
          >
            Close session
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
