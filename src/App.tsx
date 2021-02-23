import React, { useEffect, useState } from "react";

import { Stack, IStackStyles, mergeStyleSets } from "@fluentui/react";

import { AppBar } from "./components/app-bar";
import { CommandBar } from "./components/command-bar";
import { JSONEditor } from "./components/json-editor";
import { SampleData } from "./components/json-editor/mock-data";
import { useToggle, useViewport, ViewportProvider } from "./hooks";

enum Editor {
  Schema = "Schema",
  InputJson = "Input Json",
}

// Mutating styles definition
const containerStyle = (): IStackStyles => {
  return {
    root: {
      height: "100vh",
    },
  };
};

const editorStackStyle: IStackStyles = {
  root: {
    height: "100%",
  },
};

export const getEditorClassNames = ({
  isFullWidth,
}: {
  isFullWidth: boolean;
  vw: number;
  vh: number;
}) => {
  return mergeStyleSets({
    root: [
      {
        width: "50%",
        height: "100%",
      },
      isFullWidth && {
        width: "100%",
        height: "100%",
      },
    ],
  });
};

const App = (): JSX.Element => {
  const [isSchemaEditorOn, toggleASchemaEditorOn] = useToggle(false);
  const [isSchemaSampleDataOn, toggleSchemaSampleDataOn] = useToggle(false);
  const [schemaValue, setSchemaValue] = useState<string | undefined>(undefined);
  const viewportContext = useViewport();
  // const [containerCSS, setContainerCSS] = useState<IStackStyles>();
  const { vh, vw } = viewportContext;

  useEffect(() => {
    if (!isSchemaEditorOn && isSchemaSampleDataOn) {
      toggleSchemaSampleDataOn();
    }
  }, [isSchemaEditorOn, isSchemaSampleDataOn, toggleSchemaSampleDataOn]);

  const handleSchemaValueChange = (value: string) => setSchemaValue(value);

  const getSchemaValue = () =>
    isSchemaSampleDataOn && !schemaValue ? SampleData.schema : schemaValue;

  // useEffect(() => {
  //   const vhTOpx = containerStyle(vh);
  //   setContainerCSS(vhTOpx);
  // }, [vh]);

  return (
    <ViewportProvider>
      <Stack styles={containerStyle}>
        <Stack.Item>
          <AppBar />
          <CommandBar
            isSchemaEditorOn={isSchemaEditorOn}
            onSchemaEditorChange={toggleASchemaEditorOn}
            isSchemaSampleDataOn={isSchemaSampleDataOn}
            onSchemaSampleDataOn={toggleSchemaSampleDataOn}
          />
        </Stack.Item>
        <Stack wrap horizontal grow styles={editorStackStyle}>
          {isSchemaEditorOn && (
            <Stack.Item
              styles={getEditorClassNames({
                isFullWidth: !isSchemaEditorOn,
                vh,
                vw,
              })}
            >
              <JSONEditor
                title={Editor.Schema}
                path="schema.json"
                defaultValue={
                  isSchemaSampleDataOn ? SampleData.schema : undefined
                }
                onChange={handleSchemaValueChange}
              />
            </Stack.Item>
          )}
          <Stack.Item
            styles={getEditorClassNames({
              isFullWidth: !isSchemaEditorOn,
              vh,
              vw,
            })}
          >
            <JSONEditor
              title={isSchemaEditorOn ? Editor.InputJson : ""}
              path="input_json.json"
              schemaValue={getSchemaValue()}
              defaultValue={
                isSchemaSampleDataOn ? SampleData.jsonInput : undefined
              }
            />
          </Stack.Item>
        </Stack>
      </Stack>
    </ViewportProvider>
  );
};

const AppContainer = (): JSX.Element => {
  return (
    <ViewportProvider>
      <App />
    </ViewportProvider>
  );
};

export default AppContainer;
