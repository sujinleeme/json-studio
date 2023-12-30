import { CommandBar, ICommandBarItemProps, Text } from "@fluentui/react";

interface TitleBarProps {
  title: string;
}
export const TitleBar = ({ title }: TitleBarProps) => {
  const items: ICommandBarItemProps[] = [
    {
      key: title,
      text: title,
      onRender: () => (
        <Text variant="large" nowrap block>
          {title}
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
