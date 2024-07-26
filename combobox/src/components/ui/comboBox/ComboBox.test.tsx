import "@testing-library/jest-dom";
import {
  // act,
  fireEvent,
  // render,
  // renderHook,
  screen,
  waitFor,
  // within,
} from "@testing-library/react";
import ComboBox from "./ComboBox";
import axios from "axios";
import UniService from "@/api/UniService";
import { Uni } from "@/types/university";
import { renderWithClient } from "@/utils/test-utils";

describe("ComboBox component", () => {
  // let waitForPosition: () => void;

  beforeEach(() => {
    // waitForPosition = () => act(async () => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  jest.mock("axios");
  const mockedAxios = jest.mocked(axios);
  // const mockedAxios = axios as jest.Mocked<typeof axios>;

  // const mockGetUnisByName = jest.fn();
  // jest.mock("@/api/UniService", () => {
  //   return {
  //     __esModule: true,
  //     default: {
  //       UniService: {
  //         getUnisByName: jest.fn(async (name: string): Promise<Uni[]> => {
  //           mockGetUnisByName(name);
  //           return [{ name: "uni 1" }, { name: "uni 2" }, { name: "uni 3" }];
  //         }),
  //       },
  //     },
  //   };
  // });

  // jest.mock("@tanstack/react-query", () => ({
  //   QueryClient: jest.fn(),
  //   QueryClientProvider: ({ children }: { children: React.ReactNode }) =>
  //     children,
  //   useQueryClient: jest.fn(),
  //   useQuery: jest.fn().mockReturnValue({
  //     isLoading: false,
  //     data: [{ id: 1 }, { id: 2 }],
  //   }),
  //   useMutation: jest.fn().mockReturnValue({
  //     mutate: jest.fn(),
  //     isLoading: false,
  //   }),
  // }));

  it("renders", async () => {
    renderWithClient(<ComboBox />);
    await waitFor(() => {
      expect(true).toBeTruthy();
    });
  });

  it("should call onChangeInput method when input value changes", async () => {
    const handleInput = jest.fn();
    renderWithClient(<ComboBox />);
    const input = screen.getByRole("combobox");
    await waitFor(() => {
      input.addEventListener("change", handleInput);
      expect(handleInput).toHaveBeenCalledTimes(0);

      input.dispatchEvent(new Event("change", { bubbles: true }));
      expect(handleInput).toHaveBeenCalledTimes(1);
    });
  });

  it("should display the initial value", async () => {
    renderWithClient(<ComboBox />);
    const input = screen.getByRole("combobox");
    await waitFor(() => {
      expect(input.getAttribute("value")).toBe("");
    });
  });

  it("should display different value after change event", async () => {
    const testValue = "test";
    renderWithClient(<ComboBox />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: testValue } });
    await waitFor(() => {
      expect(input.getAttribute("value")).toBe(testValue);
    });
  });

  it("should call getUnisByName service after click", async () => {
    renderWithClient(<ComboBox />);
    const name = "czech";

    const unis: Uni[] = [
      { name: "Uni 1" },
      { name: "Uni 2" },
      { name: "Uni 3" },
    ];
    const response = { data: unis };
    mockedAxios.get.mockResolvedValue(response);

    const input = screen.getByRole("combobox");
    fireEvent.click(input);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(UniService.getUnisByName(name)).resolves.toEqual(response.data);
    });
  });

  it("should return list of unis after click", async () => {
    renderWithClient(<ComboBox />);

    const unis: Uni[] = [
      { name: "Uni 1" },
      { name: "Uni 2" },
      { name: "Uni 3" },
    ];
    const response = { data: unis };
    mockedAxios.get.mockResolvedValue(response);

    const input = screen.getByRole("combobox");
    fireEvent.click(input);

    const list = await screen.findByRole("list");
    await waitFor(() => {
      expect(list).toBeDefined();
      expect(list).toBeInTheDocument();
    });
  });

  it("should return error after click", async () => {
    renderWithClient(<ComboBox />);

    mockedAxios.get.mockRejectedValue("Axios error occured!");

    const input = screen.getByRole("combobox");
    fireEvent.click(input);

    const errorMsg = await screen.findByText("An error has occurred:", {
      exact: false,
    });

    const list = screen.queryByRole("list");
    await waitFor(() => {
      expect(errorMsg).toBeDefined();
      expect(errorMsg).toBeInTheDocument();
      expect(list).toBeNull();
      expect(list).not.toBeInTheDocument();
    });
  });

  // REPAIR
  // it("should select item of list of unis", async () => {
  //   renderWithClient(<ComboBox />);
  //   // await waitForPosition();

  //   const unis: Uni[] = [
  //     { name: "Uni 1" },
  //     { name: "Uni 2" },
  //     { name: "Uni 3" },
  //   ];
  //   const response = { data: unis };
  //   mockedAxios.get.mockResolvedValue(response);

  //   const input = screen.getByRole("combobox");
  //   fireEvent.click(input);

  //   // const list = await screen.findByRole("list");
  //   // const item = await screen.findByText("Uni 1");
  //   const items = await screen.findAllByText(/Uni/);
  //   fireEvent.click(items[0]);

  //   await waitFor(() => {
  //     expect(items).toBeDefined();
  //     expect(items).toHaveLength(3);
  //     expect(items[0]).toHaveAttribute("aria-selected", "true");
  //     // screen.debug();
  //   });

  //   fireEvent.click(items[0]);
  //   // screen.debug();

  //   fireEvent.click(items[1]);
  //   await waitFor(() => {
  //     // expect(items[0]).toHaveAttribute("aria-selected", "false");
  //     expect(items[1]).toHaveAttribute("aria-selected", "true");
  //     // screen.debug();
  //   });
  //   fireEvent.click(items[1]);
  //   // screen.debug();
  // });

  // Input component tests

  // MOVE IT
  it("should display error message if onChangeInput callback empty next after value change", async () => {
    const testValue = "test";
    const errorMsg = "Prázdný vstup";

    renderWithClient(<ComboBox />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: testValue } });
    let error = screen.queryByText(errorMsg);
    await waitFor(() => {
      expect(input.getAttribute("value")).toBe(testValue);
      expect(error).not.toBeInTheDocument();
    });
    fireEvent.change(input, { target: { value: "" } });
    error = screen.getByText(errorMsg);
    await waitFor(() => {
      expect(input.getAttribute("value")).toBe("");
      expect(error).toBeInTheDocument();
    });
  });

  // MOVE IT
  it("should reset input value if reset button triggered", async () => {
    const testValue = "test";

    renderWithClient(<ComboBox />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: testValue } });
    await waitFor(() => {
      expect(input.getAttribute("value")).toBe(testValue);
    });
    const reset = await screen.findByTestId("input-clear");
    fireEvent.click(reset);
    await waitFor(() => {
      expect(input.getAttribute("value")).toBe("");
    });
  });

  // it("should reset input value if reset button triggered", async () => {
  //   const handleInput = jest.fn();
  //   const testValue = "test";
  //   render(<Input input="" selectedInput="" onChangeInput={handleInput} />);
  //   const input = screen.getByRole("textbox");
  //   const reset = await screen.findByTestId("input-clear");
  //   fireEvent.change(input, { target: { value: testValue } });
  //   await waitFor(() => {
  //     expect(handleInput).toHaveBeenCalled();
  //     expect(handleInput).toHaveBeenCalledTimes(1);
  //     expect(handleInput).toHaveBeenCalledWith(testValue);
  //   });
  //   fireEvent.click(reset);
  //   await waitFor(() => {
  //     expect(input.getAttribute("value")).toBe("");
  //   });
  // });
});
