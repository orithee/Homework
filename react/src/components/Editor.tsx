import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useContext, useEffect, useState } from 'react';
import { socketContext } from '../App';
import { useSelector } from 'react-redux';
import { globalState } from '../redux/store';
import axios from 'axios';
import Smile from './utilities/Smile';
import SimpleBackdrop from './utilities/SimpleBackdrop';
import { SocketClientType } from '../helpers/types';

interface Props {
  readOnly: boolean;
}
// The code editor with the current exercise:
export default function Editor(props: Props) {
  const socket = useContext<SocketClientType>(socketContext);
  const [text, setText] = useState<string>('');
  const [solution, setSolution] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  const codeOpen = useSelector((state: globalState) => state.global.codeOpen);

  if (props.readOnly) {
    socket.on('code_change_to_client', function (msg) {
      setText(msg);
    });
  }

  useEffect(() => {
    if (!props.readOnly) socket.emit('code_change_from_client', text);
    if (text && text === solution) {
      setText(text + '\n\n\n\n Well done !!!!');
      setSuccess(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useEffect(() => {
    setLoader(true);
    getCurrentBlock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCurrentBlock = async () => {
    const res = await axios.get('/code-block/' + codeOpen);
    if (res.data) {
      setText(res.data.code || '---');
      setSolution(res.data.solution || '---');
      setLoader(false);
    }
  };

  return (
    <div style={{ overflow: 'auto' }}>
      {success ? <Smile /> : ''}
      {loader && <SimpleBackdrop />}

      <CodeMirror
        value={text}
        extensions={[javascript()]}
        readOnly={props.readOnly}
        onChange={(value) => setText(value)}
      />
    </div>
  );
}
