import React from "react";

import { render } from "@testing-library/react";

import { validFormattedJsonInput } from "../__mocks__/mock-data";
import { downloadJsonFile } from "../file";

interface MockButtonProps {
  onClick: () => void;
}
const MockButton: React.FC<MockButtonProps> = ({ onClick }) => (
  <button type="button" data-testid="mock-button" aria-label="download" onClick={onClick} />
);

describe("downloadJsonFile", () => {
  beforeEach(() => {
    window.URL.createObjectURL = jest.fn();
  });

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window.URL.createObjectURL as jest.Mock<any>).mockReset();
  });

  test("should download json file if it is invoked", () => {
    downloadJsonFile(validFormattedJsonInput);
    expect(window.URL.createObjectURL).toHaveBeenCalledTimes(1);
  });

  test("should download json file when button is clicked", () => {
    const handleDownloadClick = () => downloadJsonFile(validFormattedJsonInput);
    const { getByTestId } = render(<MockButton onClick={handleDownloadClick} />);
    const button = getByTestId("mock-button");
    button.click();
    expect(window.URL.createObjectURL).toHaveBeenCalledTimes(1);
  });
});
