import { useContext, useEffect, useRef, useState } from 'react';
import { basicSetup, useCodeMirror } from '@uiw/react-codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab, defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { socketContext } from '../App';
import { useSelector } from 'react-redux';
import { globalState } from '../redux/store';

// const code = "console.log('hello world!');\n\n\n";
const code = "console.log('hello world!');";

const extensions = [javascript(), keymap.of(defaultKeymap)];

export default function CodeEditor() {
  const connection = useContext<any>(socketContext);
  const user = useSelector((state: globalState) => state.global.user);
  const editor = useRef<HTMLDivElement | null>(null);
  const studentParams = {
    container: editor.current,
    extensions,
    value: code,
  };
  const mentorParams = {
    container: editor.current,
    extensions,
    value: code,
    readOnly: true,
  };

  const [params, setParams] = useState(studentParams);
  const [value, setValue] = useState<string>('');
  const { setContainer } = useCodeMirror(params);

  useEffect(() => {
    if (editor.current) {
      if (!user?.isStudent) setParams(mentorParams);
      setContainer(editor.current);
      console.log(editor.current.textContent);
      console.log(editor.current.nodeValue);
      console.log(editor.current.onchange);
      console.log(editor.current.outerText);
    }
  }, [editor.current]);

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div
      aria-valuetext="oooo"
      style={{ maxHeight: '100%', overflow: 'auto' }}
      ref={editor}
      onChange={(e) => setValue('ooo')}
    />
  );
}
