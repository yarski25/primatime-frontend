import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  // renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import ComboBox from "./ComboBox";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
// import UniService from "@/api/UniService";
// import { Uni } from "@/types/university";
// import UniService from "@/api/UniService";
// import { Uni } from "@/types/university";
// import UniService from "@/api/UniService";
// import mockAxios from "@/api/__mocks__/axios";
// import axios from "@/api/axiosConfig";
import axios from "axios";

export function useCustomHook() {
  return useQuery({ queryKey: ["customHook"], queryFn: () => "Hello query!" });
}

describe("ComboBox component", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // let response;

  // beforeEach(() => {
  //   response = {
  //     data: [
  //       { id: 1, name: "Uni 1" },
  //       { id: 2, name: "Uni 2" },
  //       { id: 3, name: "Uni 3" },
  //     ],
  //   };
  // });

  // jest.mock("@/api/UniService");

  jest.mock("@tanstack/react-query", () => ({
    useQuery: jest.fn(() => ({
      isLoading: false,
      data: [
        { id: 1, name: "Uni 1" },
        { id: 2, name: "Uni 2" },
        { id: 3, name: "Uni 3" },
      ],
    })),
  }));

  // jest.mock("@/api/axiosConfig", () => {
  //   return {
  //     get: jest.fn(),
  //   };
  // });
  // jest.mock("axios");
  // const mockedAxios = axios as jest.Mocked<typeof axios>;

  // jest.mock("@/api/axiosConfig", () => ({
  //   get: jest.fn(() => Promise.resolve({ data: ["name"] })),
  // }));

  // jest.mock("@/api/UniService");

  // const mockGetUnisByName = jest.fn();
  // jest.mock("@/api/UniService", () => {
  //   return {
  //     __esModule: true,
  //     default: {
  //       UniService: {
  //         getUnisByName: jest.fn(async (name: string): Promise<Uni[]> => {
  //           console.log(name);
  //           return [{ name: "uni 1" }, { name: "uni 2" }, { name: "uni 3" }];
  //         }),
  //       },
  //     },
  //   };
  // });

  // jest.mock("@/api/UniService", () => {
  //   return {
  //     __esModule: true,
  //     default: jest.fn(() => ({ response: "test" })),
  //   };
  // });

  jest.mock("axios");
  // jest.mock('axios', () => ({
  //   __esModule: true,
  //   default: axios,
  //   }));

  // jest.mock("axios", () => {
  //   return {
  //     create: jest.fn(() => axios),
  //     get: jest.fn(() => Promise.resolve({ data: {} })),
  //   };
  // });
  // const mockedAxios = axios as jest.Mocked<typeof axios>;
  const mockedAxios = jest.mocked(axios);
  // const mockedAxios = jest.mocked(axios, { shallow: true });

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

  it("should display different value after change event", async () => {
    const testValue = "test";
    render(
      <QueryClientProvider client={queryClient}>
        <ComboBox />
      </QueryClientProvider>
    );
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: testValue } });
    await waitFor(() => {
      expect(input.getAttribute("value")).toBe(testValue);
    });
  });

  it("should return list of universities after click", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ComboBox />
      </QueryClientProvider>
    );
    const unis = [{ name: "Uni 1" }, { name: "Uni 2" }, { name: "Uni 3" }];
    const input = screen.getByRole("combobox");
    fireEvent.click(input);
    // fireEvent.change(input, { target: { value: "c" } });
    // UniService.getUnisByName("c");
    // mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }));
    mockedAxios.get.mockResolvedValue(unis);
    // await UniService.getUnisByName(name);
    await waitFor(() => {
      // (mockedAxios.get as jest.Mock).mockResolvedValue(response);

      // mockedAxios.mockResolvedValue({ data: "c" });
      // const result = UniService.getUnisByName("c");
      // expect(mockedAxios.get).toHaveBeenCalled();
      // expect(UniService).toHaveBeenCalled();
      // expect(result).toEqual([]);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      screen.debug();
      // expect(UniService.getUnisByName("c")).toHaveBeenCalledTimes(1);
      // expect(input.getAttribute("value")).toBe("");
      // expect(UniService.getUnisByName("c")).toHaveBeenCalledTimes(1);
    });
    // const list = await screen.findByRole("list");
    // await waitFor(() => {
    //   expect(list).toBeInTheDocument();
    //   screen.debug();
    // });
  });

  // it("should display deploy", async () => {
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <ComboBox />
  //     </QueryClientProvider>
  //   );
  //   const input = screen.getByRole("combobox");
  //   fireEvent.click(input);
  //   await waitFor(() => {
  //     // input.dispatchEvent(new Event("click", { bubbles: true }));
  //     const spinner = screen.getByTestId("spinner-box");
  //     expect(spinner).toBeInTheDocument();
  //   });
  // });

  // it("should return API response", async () => {
  //   type Props = { children: React.ReactNode };

  //   const wrapper: React.FC<Props> = ({ children }) => (
  //     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  //   );
  //   const { result } = renderHook(() => useCustomHook(), { wrapper });
  //   await waitFor(() => expect(result.current.isSuccess).toBe(true));
  //   screen.debug();
  //   expect(result.current.data).toBeDefined();
  //   expect(result.current.data).toEqual("Hello");
  // });
});
