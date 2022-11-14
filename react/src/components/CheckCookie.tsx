import * as React from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { ChangeCodeOpen, updateUserLogged } from '../redux/globalSlice';
import SimpleBackdrop from './SimpleBackdrop';

export default function CheckCookie() {
  const { mentor } = useParams();
  const [loader, setLoader] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkMentorCookie = async () => {
    const res = await axios.get('/mentor-access', { withCredentials: true });
    if (res.data && res.data.access) {
      console.log('checkMentorCookie: ', res.data);
      dispatch(
        updateUserLogged({
          isStudent: false,
          name: 'Tom',
        })
      );
      dispatch(ChangeCodeOpen(true));
      setLoader(false);
      navigate('/CodeEditor');
    } else navigate('/');
  };

  useEffect(() => {
    if (mentor === 'mentor') {
      setLoader(true);
      checkMentorCookie();
    } else navigate('/');
  }, []);

  return <>{loader && <SimpleBackdrop />}</>;
}
