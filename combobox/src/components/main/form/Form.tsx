// import { FieldValues } from "react-hook-form";
// import Input from "../../ui/input/Input";
import ComboBox from "../../ui/comboBox/ComboBox";
import styles from "./Form.module.scss";

const Form = () => {
  // const { control, handleSubmit } = useForm();

  // const onSubmit = (data: FieldValues) => {
  //   console.log(data);
  // };
  return (
    <div className={styles.form}>
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
    </div>
  );
};

export default Form;
