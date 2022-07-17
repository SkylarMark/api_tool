/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
import Editor from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import React, { ReactElement, RefObject, useEffect } from 'react';

interface MonacoEditorProps {
  value: string;
  editorRef: RefObject<editor.IStandaloneCodeEditor | null> | null;
  readonly?: boolean;
  onChange?: (value: string | undefined) => void;
}

/**
 * React Element
 * @param {MonacoEditorProps} param0
 * @return {ReactElement}
 */
export function MonacoEditor({
  value,
  editorRef,
  readonly,
  onChange,
}: MonacoEditorProps): ReactElement {
  if (!editorRef || readonly == null) {
    throw new Error('Ref or ReadOnly is not Assigned');
  }

  const formatEditor = () => {
    if (editorRef.current) {
      editorRef.current.updateOptions({ readOnly: false });
      const formatAction = editorRef.current.getAction(
        'editor.action.formatDocument',
      );

      if (formatAction == null) {
        return;
      }

      formatAction.run().then(() => {
        if (editorRef.current) {
          editorRef.current.updateOptions({ readOnly: readonly });
        }
      });
    }
  };

  useEffect(() => {
    const timer1 = setTimeout(() => formatEditor(), 2 * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, [value]);

  const editorValue = typeof value === 'object' ? JSON.stringify(value) : value;

  return (
    <Editor
      language="json"
      value={editorValue}
      theme="vs-dark"
      options={{
        formatOnType: true,
        formatOnPaste: true,
        autoIndent: 'advanced',
        contextmenu: false,
        readOnly: readonly,
      }}
      onChange={onChange}
      onMount={(editorMount) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        editorRef.current = editorMount;
      }}
    />
  );
}

MonacoEditor.defaultProps = {
  readonly: false,
  onChange: () => ({}),
};
