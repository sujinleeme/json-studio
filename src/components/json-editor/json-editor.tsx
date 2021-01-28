import React, { useRef, useState } from "react";

import Editor, { OnMount, OnValidate } from "@monaco-editor/react";

import { useToggle } from "../../hooks";
import { CommandBar } from "../command-bar";
import { ErrorMessageBar } from "../error-message-bar";
import { downloadJsonFile } from "./file";
import { prettifyJsonString, minifyJsonString } from "./utils";

interface JSONEditorProps {
  defaultValue?: string;
  onSchemaEditorChange?: () => void;
  isSchemaEditorOn?: boolean;
}

export const JSONEditor: React.FC<JSONEditorProps> = ({
  isSchemaEditorOn = false,
  defaultValue,
  onSchemaEditorChange,
}): JSX.Element => {
  const [errors, setErrors] = useState<string[]>([]);
  const [content, setContent] = useState<string | undefined>(undefined);
  const [isAutoPrettifyOn, toggleAutoPrettifyOn] = useToggle(false);
  const [isValidJson, setIsValidJson] = useState<boolean>(false);
  const editorRef = useRef(null);

  const handleEditorWithoutPrettify = (value?: string) => setContent(value);

  const handleEditorPrettify = (value: string) => {
    const json = prettifyJsonString(value);
    setContent(json);
    // eslint-disable-next-line
    const editor: any = editorRef.current;
    // It might be a  @monaco-editor/react's problem.
    // need to set new value inside. otherwise, it can't resize horizontal slider's  width.
    if (!editor) return;
    editor.setValue(json);
  };

  const handleEditorBeforeMount = () => {
    if (defaultValue) {
      handleEditorPrettify(defaultValue);
    }
  };

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.getModel().updateOptions({ tabSize: 2, insertSpaces: false });
    // eslint-disable-next-line
    const editorEl = editor._domElement;
    editorEl.addEventListener("paste", (event: ClipboardEvent) => {
      // eslint-disable-next-line
      const paste = (event.clipboardData || (window as any).clipboardData).getData("text");
      handleEditorPrettify(paste);
    });
  };

  const handleEditorChange = (value?: string) =>
    value && isAutoPrettifyOn
      ? handleEditorPrettify(value)
      : handleEditorWithoutPrettify(value);

  const handleClearClick = () => setContent(undefined);

  const handleEditorValidation: OnValidate = (markers) => {
    const errorMessage = markers.map(
      ({ startLineNumber, message }) => `line ${startLineNumber}: ${message}`
    );
    setIsValidJson(!(errorMessage.length > 0));
    setErrors(errorMessage);
  };

  const handleMinifyClick = () => {
    const minifyJson = content && minifyJsonString(content);
    handleEditorWithoutPrettify(minifyJson);
  };

  const handlePrettifyClick = () => {
    if (!content) return;
    handleEditorPrettify(content);
  };

  const handleUploadClick = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const result = fileReader.result as string;
      handleEditorPrettify(result);
    };
    fileReader.readAsText(file);
  };

  const handleDownloadClick = () =>
    content && isValidJson && downloadJsonFile(content);

  return (
    <div>
      <CommandBar
        isValidJson={isValidJson}
        isAutoPrettifyOn={isAutoPrettifyOn}
        isSchemaEditorOn={isSchemaEditorOn}
        onAutoPrettifyChange={toggleAutoPrettifyOn}
        onClearClick={handleClearClick}
        onDownloadClick={handleDownloadClick}
        onSchemaEditorChange={onSchemaEditorChange}
        onMinifyClick={handleMinifyClick}
        onPrettifyClick={handlePrettifyClick}
        onUploadClick={handleUploadClick}
      />
      <Editor
        height="500px"
        defaultLanguage="json"
        options={{
          // formatOnPaste: true is working but the width replied on unformatted string's width
          automaticLayout: true,
          scrollBeyondLastLine: false,
        }}
        beforeMount={handleEditorBeforeMount}
        defaultValue={defaultValue}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        onValidate={handleEditorValidation}
        value={content}
      />
      {errors.length > 0 && <ErrorMessageBar errors={errors} />}
    </div>
  );
};
