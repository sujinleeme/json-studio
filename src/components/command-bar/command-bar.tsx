import React from "react";

import {
  CommandBar,
  CommandButton,
  Checkbox,
  // DefaultButton,
  ICommandBarItemProps,
  // IIconProps,
} from "@fluentui/react";

export interface CommandBarComponentProps {
  isSchemaEditorOn: boolean;
  onSchemaEditorChange: () => void;
  isSchemaSampleDataOn: boolean;
  onSchemaSampleDataOn: () => void;
}

export const CommandBarComponent: React.FC<CommandBarComponentProps> = ({
  isSchemaEditorOn,
  onSchemaEditorChange,
  isSchemaSampleDataOn,
  onSchemaSampleDataOn,
}) => {
  const leftItems: ICommandBarItemProps[] = [
    {
      key: "use-json-schema",
      onRender: () => (
        <CommandButton>
          <Checkbox
            label="Use JSON Schema"
            onChange={onSchemaEditorChange}
            checked={isSchemaEditorOn}
          />
        </CommandButton>
      ),
    },
    {
      key: "use-json-schema-sample-data",
      onRender: () =>
        isSchemaEditorOn && (
          <CommandButton>
            <Checkbox
              label="Use Sample Schema Data"
              onChange={onSchemaSampleDataOn}
              checked={isSchemaSampleDataOn}
            />
          </CommandButton>
        ),
    },
  ];

  return (
    <div>
      <CommandBar
        styles={{
          root: {
            alignItems: "center",
          },
        }}
        items={leftItems}
        // farItems={rightItems}
        ariaLabel="json content commands"
      />
    </div>
  );
};
