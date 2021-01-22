import React from "react";

import { CommandBar, ICommandBarItemProps, Text } from "@fluentui/react";

export const TopBar = (): JSX.Element => {
  const items: ICommandBarItemProps[] = [
    {
      key: "title",
      text: "title",
      onRender: () => (
        <Text variant="large" nowrap block>
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
      ariaLabel="service title"
      items={items}
    />
  );
};
