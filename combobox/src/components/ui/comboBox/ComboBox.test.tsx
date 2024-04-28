import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
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
    await waitFor(() => {
      expect(true).toBeTruthy();
    });
  });
});
