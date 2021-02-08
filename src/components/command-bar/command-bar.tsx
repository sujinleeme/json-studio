import React from "react";

import {
  CommandBar,
  CommandButton,
  Checkbox,
  // DefaultButton,
  Dropdown,
  ICommandBarItemProps,
  IDropdownOption,
  // IIconProps,
} from "@fluentui/react";

export interface ToolBarProps {
  isSchemaEditorOn?: boolean;
  onSchemaEditorChange?: () => void;
}

const options: IDropdownOption[] = [
  { key: "2019-09", text: "2019-09" },
  { key: "draft-7", text: "Draft 7" },
  { key: "draft-6", text: "Draft 6" },
  { key: "draft-5", text: "Draft 5" },
  { key: "draft-4", text: "Draft 4" },
  { key: "draft-3", text: "Draft 3" },
];

export const CommandBarComponent: React.FC<ToolBarProps> = ({
  onSchemaEditorChange,
  isSchemaEditorOn,
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
      key: "show-schema",
      onRender: () =>
        isSchemaEditorOn && (
          <CommandButton>
            <Dropdown
              placeholder="Select JSON Schema"
              options={options}
              // styles={dropdownStyles}
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
