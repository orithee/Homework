import { Divider, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UpdateLinks } from '../redux/globalSlice';

interface Props {
  sessionId: number;
  setOpenSession: Function;
}

export default function StudentsList({ sessionId, setOpenSession }: Props) {
  const [students, setStudents] = useState<{ name: string }[]>();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get('/students');
    if (res.data) {
      setStudents(res.data.students);
    }
  };

  const createSession = async (student: string) => {
    console.log('session created', student, sessionId);
    const sessionData = { name: student, sessionId: sessionId };
    try {
      const res = await axios.post('/new-session', sessionData);
      if (res.data) {
        const host = res.data.nodeEnv + window.location.host;
        const mentorLink = host + '/access/mentor';
        const studentLink = host + '/student_login/' + res.data.uuid;
        dispatch(UpdateLinks({ student: studentLink, mentor: mentorLink }));
        console.log('mentorLink:');
        console.log(mentorLink);
        console.log('studentLink:');
        console.log(studentLink);
      }
    } catch (error) {}
    setOpenSession(false);
  };

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      <Typography component="p" variant="h6">
        Choose student:
      </Typography>
      {students && (
        <li>
          <Divider />
          {students.map((student, index) => (
            <ul
              onClick={() => createSession(student.name)}
              key={index}
              style={{ cursor: 'pointer' }}
            >
              <ListItem>
                <ListItemText primary={student.name} />
              </ListItem>
              <Divider />
            </ul>
          ))}
        </li>
      )}
    </List>
  );
}
