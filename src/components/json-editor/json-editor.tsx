import React, { useState, useRef } from "react";

import Editor, { OnMount, OnValidate } from "@monaco-editor/react";

import { CommandBar } from "../command-bar";
import { ErrorMessageBar } from "../error-message-bar";
import { TopBar } from "../top-bar";
import { downloadJsonFile } from "./file";
import { prettifyJsonString, minifyJsonString } from "./utils";

interface JSONEditorProps {
  defaultValue?: string;
}
export const JSONEditor: React.FC<JSONEditorProps> = ({
  defaultValue,
}): JSX.Element => {
  const [errors, setErrors] = useState<string[]>([]);
  const [content, setContent] = useState<string | undefined>(undefined);
  const [isAutoPrettify, setAutoPrettify] = useState<boolean>(false);
  const [isValidJson, setIsValidJson] = useState<boolean>(false);

  const editorRef = useRef(null);
  let fileReader: FileReader;

  const handleEditorWithoutPrettify = (value?: string) => setContent(value);

  const handleEditorPrettify = (value: string) => {
    const json = prettifyJsonString(value);
    setContent(json);
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
    value && isAutoPrettify
      ? handleEditorPrettify(value)
      : handleEditorWithoutPrettify(value);

  const handleClearClick = () => setContent(undefined);

  const handleEditorValidation: OnValidate = (markers) => {
    const errorMessage = markers.map(
      ({ startLineNumber, message }) => `line ${startLineNumber}: ${message}`
    );
    setIsValidJson(errorMessage.length > 0);
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

  const handleLivePrettifyChange = () => setAutoPrettify(!isAutoPrettify);

  const handleFileRead = () => {
    const result = fileReader.result as string;
    handleEditorChange(result);
  };

  const handleUploadClick = (target: HTMLInputElement) => {
    target.click();
    const isFile: boolean = target.files!.length > 0;
    if (isFile) {
      fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(target.files![0]);
    }
  };

  const handleDownloadClick = () =>
    content && isValidJson && downloadJsonFile(content);

  return (
    <div>
      <TopBar />
      <CommandBar
        onMinifyClick={handleMinifyClick}
        onPrettifyClick={handlePrettifyClick}
        isAutoPrettify={isAutoPrettify}
        onLivePrettifyChange={handleLivePrettifyChange}
        onClearClick={handleClearClick}
        onUploadClick={handleUploadClick}
        onDownloadClick={handleDownloadClick}
        isValidJson={isValidJson}
      />
      <Editor
        height="500px"
        defaultLanguage="json"
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
