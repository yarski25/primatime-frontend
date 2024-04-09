import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Form from "./components/form/Form";
// import Input from "./components/input/Input";
import "./App.scss";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <p>ComboBox</p> */}
      {/* <Input /> */}
      {/* <ComboBox /> */}
      <Form />
    </QueryClientProvider>
  );
}

export default App;
