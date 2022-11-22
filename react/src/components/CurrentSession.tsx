import { Button, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UpdateLinks } from '../redux/globalSlice';
import { globalState } from '../redux/store';
import SimpleBackdrop from './utilities/SimpleBackdrop';
import Title from './utilities/Title';
import Copy from './utilities/Copy';
import { style } from '../helpers/style';

// A window describing the current active session:
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
      <Modal open={true}>
        <Box sx={style}>
          {loader && <SimpleBackdrop />}
          <Title>Links to the current session:</Title>
          <Divider sx={{ margin: '2%' }} />
          <div>Student link:</div>
          <Copy text={links.student} />
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
          <Copy text={links.mentor} />
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
