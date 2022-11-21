import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StudentsType } from '../helpers/types';
import { globalState } from '../redux/store';
import BasicModal from './utilities/BasicModal';
import CurrentSession from './CurrentSession';
import StudentCard from './StudentCard';

// A component that displays students details:
export default function StudentsContainer() {
  const [openSession, setOpenSession] = useState<boolean | number>(false);
  const codeOpen = useSelector((state: globalState) => state.global.codeOpen);
  const links = useSelector((state: globalState) => state.global.sessionLinks);
  const [students, setStudents] = useState<StudentsType[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get('/students');
    if (res.data) {
      console.log(res.data);
      setStudents(res.data.students);
    }
  };

  return (
    <>
      <Grid container spacing={5}>
        {students &&
          students.map((student, index) => {
            return <StudentCard student={student} />;
          })}
      </Grid>
      {typeof openSession === 'number' && (
        <BasicModal setOpenSession={setOpenSession} sessionId={openSession} />
      )}
      {links.mentor && links.student && <CurrentSession />}
    </>
  );
}
