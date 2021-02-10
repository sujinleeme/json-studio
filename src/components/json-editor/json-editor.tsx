import React, { useCallback, useEffect, useRef, useState } from "react";

import { Stack, IStackStyles } from "@fluentui/react";
import Editor, { BeforeMount, OnMount, OnValidate } from "@monaco-editor/react";

import { useToggle } from "../../hooks";
import { ErrorMessageBar } from "./components/error-message-bar";
import { TitleBar } from "./components/title-bar";
import { ToolBar } from "./components/tool-bar";
import { BorderLine } from "./styles";
import {
  downloadJsonFile,
  prettifyJsonString,
  minifyJsonString,
  parseJsonSchemaString,
} from "./utils";

const stackStyles: IStackStyles = {
  root: {
    height: "100%",
    borderTop: BorderLine,
    borderRight: BorderLine,
    borderBottom: BorderLine,
  },
};

interface JSONEditorProps {
  defaultValue?: string;
  schemaValue?: string;
  title?: string;
  path?: string;
}

export const JSONEditor: React.FC<JSONEditorProps> = ({
  defaultValue,
  schemaValue,
  title,
  path,
}): JSX.Element => {
  const [errors, setErrors] = useState<string[]>([]);
  const [content, setContent] = useState<string | undefined>(undefined);
  const [isAutoPrettifyOn, toggleAutoPrettifyOn] = useToggle(false);
  const [isValidJson, setIsValidJson] = useState<boolean>(false);
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  const updateEditorLayout = useCallback(() => {
    // eslint-disable-next-line
    const editor: any = editorRef.current;
    if (!editor) return;
    // eslint-disable-next-line
    const editorEl = editor._domElement;
    editor.layout({
      width: "auto",
      height: "auto",
    });
    const { width, height } = editorEl.getBoundingClientRect();
    editor.layout({
      width,
      height,
    });
  }, []);

  const updateJsonSchemas = useCallback(() => {
    const monaco: any = monacoRef.current;
    if (!monaco) return;
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: schemaValue
        ? [
            {
              uri: "http://myserver/foo-schema.json", // id of the first schema
              fileMatch: ["*"], // associate with our model
              schema: {
                ...parseJsonSchemaString(schemaValue),
              },
            },
          ]
        : undefined,
    });
  }, [schemaValue]);

  const handleEditorWithoutPrettify = (value?: string) => {
    setContent(value);
  };

  const handleEditorPrettify = useCallback((value?: string) => {
    console.log("pretty=======", value);
    if (!value) {
      setContent(undefined);
    } else {
      console.log("save to editor");
      // eslint-disable-next-line
      const json = prettifyJsonString(value);
      setContent(json);
      const editor: any = editorRef.current;
      if (!editor) return;
      // It might be a  @monaco-editor/react's problem.
      // It needs to set a new value inside. otherwise, it can't resize the horizontal slider's width.
      editor.setValue(json);
    }
  }, []);

  const handleEditorWillMount: BeforeMount = (monaco) => {
    monacoRef.current = monaco;
    updateJsonSchemas();
    handleEditorPrettify(defaultValue);
  };

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;

    editor.getModel().updateOptions({ tabSize: 2, insertSpaces: false });

    window.addEventListener("resize", () => {
      // automaticLayout isn't working
      // https://github.com/suren-atoyan/monaco-react/issues/89#issuecomment-666581193
      // clear current layout
      updateEditorLayout();
    });
  };

  const handleEditorChange = useCallback(
    (value?: string) =>
      isAutoPrettifyOn
        ? handleEditorPrettify(value)
        : handleEditorWithoutPrettify(value),
    [isAutoPrettifyOn, handleEditorPrettify]
  );

  useEffect(() => {
    handleEditorPrettify(defaultValue);
  }, [defaultValue, handleEditorPrettify]);

  useEffect(() => {
    updateJsonSchemas();
  }, [schemaValue, updateJsonSchemas]);

  const handleClearClick = () => setContent(undefined);

  const handleEditorValidation: OnValidate = useCallback(
    (markers) => {
      console.log(markers);
      const errorMessage = markers.map(
        ({ startLineNumber, message }) => `line ${startLineNumber}: ${message}`
      );
      console.log(errorMessage, content);
      const hasContent: boolean = !!content && content.length > 0;
      const hasError: boolean = errorMessage.length > 0;
      setIsValidJson(hasContent && !hasError);
      setErrors(errorMessage);
    },
    [content]
  );

  const handleMinifyClick = () => {
    const minifyJson: string | undefined = content
      ? minifyJsonString(content)
      : content;
    handleEditorWithoutPrettify(minifyJson);
  };

  const handlePrettifyClick = () => handleEditorPrettify(content);

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
    <Stack styles={stackStyles}>
      {title && (
        <Stack.Item>
          <TitleBar title={title} />
        </Stack.Item>
      )}
      <Stack.Item>
        <ToolBar
          isValidJson={isValidJson}
          isAutoPrettifyOn={isAutoPrettifyOn}
          onAutoPrettifyChange={toggleAutoPrettifyOn}
          onClearClick={handleClearClick}
          onDownloadClick={handleDownloadClick}
          onMinifyClick={handleMinifyClick}
          onPrettifyClick={handlePrettifyClick}
          onUploadClick={handleUploadClick}
        />
      </Stack.Item>
      <Stack styles={stackStyles}>
        <Stack.Item grow align="stretch">
          <Editor
            language="json"
            path={path}
            options={{
              // formatOnPaste: true is working but the width replied on unformatted string's width
              automaticLayout: true,
              scrollBeyondLastLine: false,
            }}
            onMount={handleEditorDidMount}
            onChange={handleEditorChange}
            beforeMount={handleEditorWillMount}
            onValidate={handleEditorValidation}
            value={content}
          />
        </Stack.Item>
        <Stack.Item>
          <ErrorMessageBar errors={errors} />
        </Stack.Item>
      </Stack>
    </Stack>
  );
};
