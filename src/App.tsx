import React from "react";

import { Stack, IStackStyles } from "@fluentui/react";

import { JSONEditor } from "./components/json-editor";
import { TopBar } from "./components/top-bar";
import { useToggle } from "./hooks";

// Mutating styles definition
const stackStyles: IStackStyles = {
  root: {
    height: "100vh",
  },
};

const defaultValue =
  '{"glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}}';

const App = (): JSX.Element => {
  const [isSchemaEditorOn, toggleASchemaEditorOn] = useToggle(false);

  return (
    <Stack styles={stackStyles}>
      <Stack.Item>
        <TopBar />
      </Stack.Item>
      <Stack.Item align="stretch" grow>
        {isSchemaEditorOn && (
          <Stack.Item>
            <JSONEditor defaultValue={defaultValue} />
          </Stack.Item>
        )}
        <JSONEditor
          defaultValue={defaultValue}
          isSchemaEditorOn={isSchemaEditorOn}
          onSchemaEditorChange={toggleASchemaEditorOn}
        />
      </Stack.Item>
    </Stack>
  );
};

export default App;
