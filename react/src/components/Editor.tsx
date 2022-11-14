import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useContext, useEffect, useState } from 'react';
import { socketContext } from '../App';
import { useSelector } from 'react-redux';
import { globalState } from '../redux/store';
import axios from 'axios';

interface Props {
  readOnly: boolean;
}

export default function Editor(props: Props) {
  const socket = useContext<any>(socketContext);
  const [text, setText] = useState<string>('');
  const codeOpen = useSelector((state: globalState) => state.global.codeOpen);

  if (props.readOnly) {
    socket.on('code change', function (msg: any) {
      setText(msg);
    });
  }
  useEffect(() => {
    if (!props.readOnly) socket.emit('code change', text);
  }, [text]);

  useEffect(() => {
    getCurrentBlock();
  }, []);

  const getCurrentBlock = async () => {
    const res = await axios.get('/code-block/' + codeOpen);
    if (res.data) {
      console.log(res.data);
      setText(res.data.code || '---');
      // setText(res.data.students);
    }
  };

  return (
    <>
      <CodeMirror
        value={text}
        extensions={[javascript()]}
        readOnly={props.readOnly}
        onChange={(value) => setText(value)}
      />
    </>
  );
}
