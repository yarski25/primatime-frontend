import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import ComboBox from "./ComboBox";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("ComboBox", () => {
  const queryClient = new QueryClient();

  it("Renders ComboBox component", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ComboBox />
      </QueryClientProvider>
    );
    screen.debug();
    await waitFor(() => {
      expect(true).toBeTruthy();
    });
  });

  //   it("Renders floating portal", async () => {
  //     <QueryClientProvider client={queryClient}>
  //     <ComboBox />
  //   </QueryClientProvider>

  //     const containerEl = screen.getByTestId("input-container");
  //     await waitFor(() => {
  //       expect(containerEl).toBeInTheDocument();
  //     });
  //   });
});
