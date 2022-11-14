import { useEffect, useRef } from 'react';
import { basicSetup, useCodeMirror } from '@uiw/react-codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab, defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';

const code = "console.log('hello world!');\n\n\n";
const extensions = [javascript(), keymap.of(defaultKeymap)];

export default function CodeEditor() {
  const editor = useRef<HTMLDivElement | null>(null);
  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions,
    value: code,
    // readOnly: true,
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor.current]);

  return <div style={{ maxHeight: '100%', overflow: 'auto' }} ref={editor} />;
}
