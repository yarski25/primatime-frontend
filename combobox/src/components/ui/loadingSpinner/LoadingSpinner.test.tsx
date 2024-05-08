import { render, screen } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";

describe("Loading spinner component", () => {
  it("renders", () => {
    render(<LoadingSpinner />);
    expect(true).toBeTruthy();
  });

  it("contains spinner box and spinner", () => {
    render(<LoadingSpinner />);
    // screen.debug();
    const spinnerBoxEl = screen.getByTestId("spinner-box");
    const spinnerEl = screen.getByTestId("spinner");
    expect(spinnerBoxEl).toBeTruthy();
    expect(spinnerEl).toBeTruthy();
  });
});
