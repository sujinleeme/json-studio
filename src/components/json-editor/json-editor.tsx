import React, { useState, useRef } from "react";
import Editor, { OnMount, OnValidate } from "@monaco-editor/react";
import { MessageBar, MessageBarType } from "@fluentui/react";
import { downloadJsonFile } from "./file";

import { CommandBar } from "../command-bar";

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

  const handleEditorWithoutPrettify = (value: string) => setContent(value);

  const handleEditorPrettify = (value: string) => {
    const json = prettifyJsonString(value);
    setContent(json);
  };

  const handleEditorBeforeMount = () => {
    if (defaultValue) {
      handleEditorPrettify(defaultValue);
    }
  };

  const handleEditorDidMount: OnMount = (editor, event) => {
    editorRef.current = editor;
    editor.getModel().updateOptions({ tabSize: 2, insertSpaces: false });
    const editorEl = editor._domElement;
    editorEl.addEventListener("paste", (event: ClipboardEvent) => {
      const paste = (
        event.clipboardData || (window as any).clipboardData
      ).getData("text");
      handleEditorPrettify(paste);
    });
  };

  const handleEditorChange = (value?: string) => {
    if (!value) return;
    isAutoPrettify
      ? handleEditorPrettify(value)
      : handleEditorWithoutPrettify(value);
  };

  const handleClearClick = () => setContent(undefined);

  const handleEditorValidation: OnValidate = (markers) => {
    const errorMessage = markers.map(
      ({ startLineNumber, message }) => `line ${startLineNumber}: ${message}`
    );
    setIsValidJson(errorMessage.length > 0);
    setErrors(errorMessage);
  };

  const handleMinifyClick = () => {
    if (!content) return;
    const minifyJson = minifyJsonString(content);
    handleEditorWithoutPrettify(minifyJson);
  };

  const handlePrettifyClick = () => {
    if (!content) return;
    handleEditorPrettify(content);
  };

  const handleLivePrettifyChange = () => setAutoPrettify(!isAutoPrettify);

  const handleFileRead = () => {
    const content = fileReader.result as string;
    handleEditorChange(content);
  };

  const handleUploadClick = (target: HTMLInputElement) => {
    target.click();
    if (target.files!.length > 0) {
      fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(target.files![0]);
    }
  };

  const handleDownloadClick = () => {
    return !content ? alert("no json content") : downloadJsonFile(content);
  };

  return (
    <div>
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
        height="90vh"
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

interface ErrorMessageBarProps {
  errors: string[];
}

const ErrorMessageBar: React.FC<ErrorMessageBarProps> = ({
  errors,
}): JSX.Element => (
  <MessageBar
    messageBarType={MessageBarType.error}
    isMultiline={false}
    dismissButtonAriaLabel="Close"
  >
    {errors.map((error, index) => (
      <p key={`error-${index}`}>{error}</p>
    ))}
  </MessageBar>
);
