import React from "react";

import { CommandBar, ICommandBarItemProps, Text } from "@fluentui/react";

export const AppBar = (): JSX.Element => {
  const items: ICommandBarItemProps[] = [
    {
      key: "title",
      text: "title",
      onRender: () => (
        <Text variant="xLarge" nowrap block>
          JSON Online Editor
        </Text>
      ),
    },
  ];
  return (
    <CommandBar
      styles={{
        root: {
          alignItems: "center",
        },
      }}
      ariaLabel="app title"
      items={items}
    />
  );
};
