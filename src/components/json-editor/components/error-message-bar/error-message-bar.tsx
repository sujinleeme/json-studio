import React from "react";

import {
  DetailsList,
  ScrollablePane,
  ScrollbarVisibility,
  Sticky,
  StickyPositionType,
  mergeStyleSets,
  IDetailsHeaderProps,
  IRenderFunction,
  IColumn,
} from "@fluentui/react";
import { v4 as uuid } from "uuid";

import { BorderLine } from "../../styles";

interface ErrorMessageBarProps {
  errors: string[];
}

const classNames = mergeStyleSets({
  wrapper: {
    height: "inherit",
    position: "relative",
  },
});

const headerStyle = {
  root: {
    padding: 0,
    borderTop: BorderLine,
  },
};

const onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = (props, defaultRender) => {
  if (!props) return null;
  return (
    <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced>
      {defaultRender!({
        ...props,
        styles: headerStyle,
      })}
    </Sticky>
  );
};

export const ErrorMessageBar: React.FC<ErrorMessageBarProps> = ({ errors }): JSX.Element => {
  const items = errors.map((error) => ({
    key: `error-${uuid()}`,
    problems: error,
  }));

  const columns: IColumn[] = [
    {
      key: "problems",
      name: `Problems (${errors.length})`,
      fieldName: "problems",
      minWidth: 300,
      maxWidth: 300,
      isResizable: true,
    },
  ];

  return (
    <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto} className={classNames.wrapper}>
      <DetailsList
        compact
        items={items}
        columns={columns}
        checkboxVisibility={2}
        onRenderDetailsHeader={onRenderDetailsHeader}
      />
    </ScrollablePane>
  );
};
