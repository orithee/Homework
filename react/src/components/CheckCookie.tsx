import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ChangeCodeOpen, UpdateUserLogged } from '../redux/globalSlice';
import SimpleBackdrop from './utilities/SimpleBackdrop';

// A component that checks the mentor's cookies before moving to the code editor:
export default function CheckCookie() {
  const { mentor } = useParams();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkMentorCookie = async () => {
    const res = await axios.get('/mentor-access', { withCredentials: true });
    if (res.data && res.data.access) {
      const update = { isStudent: false, name: 'Tom' };
      dispatch(UpdateUserLogged(update));
      dispatch(ChangeCodeOpen(res.data.uuid));
      setLoader(false);
      navigate('/CodeEditor');
    } else navigate('/');
  };

  useEffect(() => {
    if (mentor === 'mentor') {
      setLoader(true);
      checkMentorCookie();
    } else navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{loader && <SimpleBackdrop />}</>;
}
