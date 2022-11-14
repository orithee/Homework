import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import StudentsList from './StudentsList';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  sessionId: number;
  setOpenSession: Function;
}

export default function BasicModal({ sessionId, setOpenSession }: Props) {
  // const [open, setOpen] = React.useState(true);
  // const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={true}
        onClose={() => setOpenSession(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <StudentsList setOpenSession={setOpenSession} sessionId={sessionId} />
        </Box>
      </Modal>
    </div>
  );
}
