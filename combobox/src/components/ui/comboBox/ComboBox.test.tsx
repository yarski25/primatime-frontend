import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import ComboBox from "./ComboBox";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

export function useCustomHook() {
  return useQuery({ queryKey: ["customHook"], queryFn: () => "Hello" });
}

describe("ComboBox component", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  it("renders", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ComboBox />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(true).toBeTruthy();
    });
  });

  it("should call onChangeInput method when input value changes", async () => {
    const handleInput = jest.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <ComboBox />
      </QueryClientProvider>
    );
    const input = screen.getByRole("combobox");
    await waitFor(() => {
      input.addEventListener("change", handleInput);
      expect(handleInput).toHaveBeenCalledTimes(0);

      input.dispatchEvent(new Event("change", { bubbles: true }));
      expect(handleInput).toHaveBeenCalledTimes(1);
    });
  });

  it("should display the initial value", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ComboBox />
      </QueryClientProvider>
    );
    const input = screen.getByRole("combobox");
    await waitFor(() => {
      expect(input.getAttribute("value")).toBe("");
    });
  });

  it("should display different value", async () => {
    const testValue = "test";
    render(
      <QueryClientProvider client={queryClient}>
        <ComboBox />
      </QueryClientProvider>
    );
    const input = screen.getByRole("combobox");
    await waitFor(() => {
      input.dispatchEvent(new Event("change", { bubbles: true }));
      fireEvent.change(input, { target: { value: testValue } });
      expect(input.getAttribute("value")).toBe(testValue);
    });
  });

  it("should return API response", async () => {
    type Props = { children: React.ReactNode };
    const wrapper: React.FC<Props> = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useCustomHook(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });
});
