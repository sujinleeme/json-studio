import React from "react";

import { Stack, IStackTokens, IStackStyles } from "@fluentui/react";

import { JSONEditor } from "./components/json-editor";
import { TopBar } from "./components/top-bar";
import { useToggle } from "./hooks";

const wrapStackTokens: IStackTokens = { childrenGap: "30" };

// Mutating styles definition
const containerStackStyles: IStackStyles = {
  root: {
    // background: DefaultPalette.themeTertiary,
    height: 800,
  },
};

const defaultValue =
  '{"glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}}';

const App = (): JSX.Element => {
  const [isSchemaEditorOn, toggleASchemaEditorOn] = useToggle(false);

  return (
    <div className="App">
      <TopBar />
      <Stack
        wrap
        horizontal
        styles={containerStackStyles}
        tokens={wrapStackTokens}
      >
        <Stack.Item grow>
          <JSONEditor
            defaultValue={defaultValue}
            isSchemaEditorOn={isSchemaEditorOn}
            onSchemaEditorChange={toggleASchemaEditorOn}
          />
        </Stack.Item>
        {isSchemaEditorOn && (
          <Stack.Item grow>
            <JSONEditor defaultValue={defaultValue} />
          </Stack.Item>
        )}
      </Stack>
    </div>
  );
};

export default App;
