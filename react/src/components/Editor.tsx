import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useContext, useEffect, useState } from 'react';
import { socketContext } from '../App';
import { useSelector } from 'react-redux';
import { globalState } from '../redux/store';
import axios from 'axios';
import Smile from './Smile';
import SimpleBackdrop from './SimpleBackdrop';

interface Props {
  readOnly: boolean;
}

export default function Editor(props: Props) {
  const socket = useContext<any>(socketContext);
  const [text, setText] = useState<string>('');
  const [solution, setSolution] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  const codeOpen = useSelector((state: globalState) => state.global.codeOpen);

  if (props.readOnly) {
    socket.on('code change', function (msg: any) {
      setText(msg);
    });
  }
  useEffect(() => {
    if (!props.readOnly) socket.emit('code change', text);
    if (text && text === solution) {
      setText(text + '\n\n\n\n Well done !!!!');
      setSuccess(true);
    }
  }, [text]);

  useEffect(() => {
    setLoader(true);
    getCurrentBlock();
  }, []);

  const getCurrentBlock = async () => {
    const res = await axios.get('/code-block/' + codeOpen);
    if (res.data) {
      console.log(res.data);
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
