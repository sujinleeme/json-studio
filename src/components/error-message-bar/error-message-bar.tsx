import React from "react";

import { MessageBar, MessageBarType } from "@fluentui/react";
import { v4 as uuid } from "uuid";

interface ErrorMessageBarProps {
  errors: string[];
}

export const ErrorMessageBar: React.FC<ErrorMessageBarProps> = ({
  errors,
}): JSX.Element => (
  <MessageBar
    messageBarType={MessageBarType.error}
    isMultiline={false}
    dismissButtonAriaLabel="Close"
  >
    {errors.map((error) => (
      <p key={uuid()}>{error}</p>
    ))}
  </MessageBar>
);
