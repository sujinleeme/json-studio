import React, { useRef } from "react";

import {
  CommandBar as CommandBarComponent,
  ICommandBarItemProps,
  CommandButton,
  Checkbox,
  DefaultButton,
  Dropdown,
  IDropdownOption,
} from "@fluentui/react";

export interface CommandBarProps {
  onMinifyClick: () => void;
  onPrettifyClick: () => void;
  isAutoPrettifyOn: boolean;
  isSchemaEditorOn?: boolean;
  onClearClick: () => void;
  onSchemaEditorChange?: () => void;
  onAutoPrettifyChange: () => void;
  onDownloadClick: () => void;
  onUploadClick: (target: HTMLInputElement) => void;
  isValidJson: boolean;
}

const options: IDropdownOption[] = [
  { key: "2019-09", text: "2019-09" },
  { key: "draft-7", text: "Draft 7" },
  { key: "draft-6", text: "Draft 6" },
  { key: "draft-5", text: "Draft 5" },
  { key: "draft-4", text: "Draft 4" },
  { key: "draft-3", text: "Draft 3" },
];

export const CommandBar: React.FC<CommandBarProps> = ({
  onMinifyClick,
  onPrettifyClick,
  isAutoPrettifyOn,
  onAutoPrettifyChange,
  onClearClick,
  onDownloadClick,
  onSchemaEditorChange,
  onUploadClick,
  isValidJson,
  isSchemaEditorOn,
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleOnChange = () => {
    const target = inputFileRef.current;
    if (!target) return;
    onUploadClick(target);
  };

  const leftItems: ICommandBarItemProps[] = [
    {
      key: "upload",
      // name: 'Upload xml Document',
      text: "Upload",
      iconProps: { iconName: "Upload" },
      onClick: handleOnChange,
    },
    {
      key: "upload-input",
      text: "Upload",
      onRender: () => (
        <input
          ref={inputFileRef}
          style={{ display: "none" }}
          type="file"
          accept="application/json"
          onChange={handleOnChange}
        />
      ),
    },
    {
      key: "download",
      text: "Download",
      ariaLabel: "Grid view",
      iconProps: { iconName: "Download" },
      onClick: onDownloadClick,
      disabled: !isValidJson,
    },
    {
      key: "clear",
      text: "Clear",
      iconProps: { iconName: "Delete" },
      onClick: onClearClick,
    },
    {
      key: "prettify",
      text: "Prettify",
      iconProps: { iconName: "MaximumValue" },
      onClick: onPrettifyClick,
      disabled: !isValidJson,
    },
    {
      key: "minify",
      text: "Minify",
      iconProps: { iconName: "MinimumValue" },
      onClick: onMinifyClick,
      disabled: !isValidJson,
    },
    {
      key: "auto-prettify",
      onRender: () => (
        <CommandButton>
          <Checkbox
            label="Auto Prettify"
            onChange={onAutoPrettifyChange}
            checked={isAutoPrettifyOn}
          />
        </CommandButton>
      ),
    },
    {
      key: "use-json-schema",
      onRender: () =>
        onSchemaEditorChange && (
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
        onSchemaEditorChange && (
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

  const rightItems: ICommandBarItemProps[] = [
    {
      key: "submit",
      text: "Submit",
      // onClick: () => console.log("Info"),
      onRender: () => (
        <div>
          <DefaultButton
            iconProps={{ iconName: "Save" }}
            primary
            disabled={isValidJson}
            text="Submit"
            allowDisabledFocus
          />
        </div>
      ),
    },
    {
      key: "info",
      text: "Info",
      // This needs an ariaLabel since it's icon-only
      ariaLabel: "Info",
      iconOnly: true,
      iconProps: { iconName: "Info" },
      // onClick: () => console.log("Info"),
    },
  ];

  return (
    <div>
      <CommandBarComponent
        styles={{
          root: {
            alignItems: "center",
          },
        }}
        items={leftItems}
        farItems={rightItems}
        ariaLabel="json content commands"
      />
    </div>
  );
};
