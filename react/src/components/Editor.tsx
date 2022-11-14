import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useContext, useEffect, useState } from 'react';
import { socketContext } from '../App';

interface Props {
  readOnly: boolean;
}

export default function Editor(props: Props) {
  const socket = useContext<any>(socketContext);
  const [text, setText] = useState<string>('');

  if (props.readOnly) {
    socket.on('code change', function (msg: any) {
      setText(msg);
    });
  }
  useEffect(() => {
    if (!props.readOnly) socket.emit('code change', text);
  }, [text]);

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
