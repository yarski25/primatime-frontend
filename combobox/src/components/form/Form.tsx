import { Controller, FieldValues, useForm } from "react-hook-form";
import Input from "../ui/input/Input";
import ComboBox from "../ui/comboBox/ComboBox";

const Form = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="Input"
          control={control}
          defaultValue=""
          render={({ field }) => <Input />}
        />
        <button type="submit">Odeslat</button>
      </form> */}
      <ComboBox />
    </>
  );
};

export default Form;
