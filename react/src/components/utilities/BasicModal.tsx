import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import StudentsList from '../StudentsList';
import { style } from '../../helpers/style';

interface Props {
  sessionId: number;
  setOpenSession: Function;
}

export default function BasicModal({ sessionId, setOpenSession }: Props) {
  return (
    <div>
      <Modal open={true} onClose={() => setOpenSession(false)}>
        <Box sx={style}>
          <StudentsList setOpenSession={setOpenSession} sessionId={sessionId} />
        </Box>
      </Modal>
    </div>
  );
}
