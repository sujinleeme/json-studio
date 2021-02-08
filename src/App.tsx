import React from "react";

import { Stack, IStackStyles, mergeStyleSets } from "@fluentui/react";

import { AppBar } from "./components/app-bar";
import { CommandBar } from "./components/command-bar";
import { JSONEditor } from "./components/json-editor";
import { useToggle } from "./hooks";

// Mutating styles definition
const containerStyle: IStackStyles = {
  root: {
    height: "100vh",
  },
};

const editorStackStyle: IStackStyles = {
  root: {
    height: "100%",
  },
};

export const getEditorClassNames = (isFullWidth: boolean) => {
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

const defaultValue =
  '{"glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}}';

const App = (): JSX.Element => {
  const [isSchemaEditorOn, toggleASchemaEditorOn] = useToggle(false);

  return (
    <Stack styles={containerStyle}>
      <Stack.Item>
        <AppBar />
        <CommandBar
          isSchemaEditorOn={isSchemaEditorOn}
          onSchemaEditorChange={toggleASchemaEditorOn}
        />
      </Stack.Item>
      <Stack wrap horizontal grow styles={editorStackStyle}>
        {isSchemaEditorOn && (
          <Stack.Item styles={getEditorClassNames(!isSchemaEditorOn)}>
            <JSONEditor title="Schema" />
          </Stack.Item>
        )}
        <Stack.Item styles={getEditorClassNames(!isSchemaEditorOn)}>
          <JSONEditor
            title={isSchemaEditorOn ? "Input JSON" : ""}
            defaultValue={defaultValue}
            isSchemaEditorOn={isSchemaEditorOn}
            onSchemaEditorChange={toggleASchemaEditorOn}
          />
        </Stack.Item>
      </Stack>
    </Stack>
  );
};

export default App;
