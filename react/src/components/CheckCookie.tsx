import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ChangeCodeOpen, updateUserLogged } from '../redux/globalSlice';
import SimpleBackdrop from './utilities/SimpleBackdrop';

export default function CheckCookie() {
  const { mentor } = useParams();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkMentorCookie = async () => {
    const res = await axios.get('/mentor-access', { withCredentials: true });
    if (res.data && res.data.access) {
      const update = { isStudent: false, name: 'Tom' };
      dispatch(updateUserLogged(update));
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
  }, []);

  return <>{loader && <SimpleBackdrop />}</>;
}
