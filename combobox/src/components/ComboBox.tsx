import { useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
};

const ComboBox = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));
  // firstName and lastName will have correct type

  return (
    <form onSubmit={onSubmit}>
      <label>First Name</label>
      <input {...register("firstName")} />
      <label>Last Name</label>
      <input {...register("lastName")} />
      <button
        type="button"
        onClick={() => {
          setValue("lastName", "Smith"); // ✅
          setValue("firstName", "John"); // ❌: true is not string
          errors; // ❌: property bill does not exist
        }}
      >
        SetValue
      </button>
    </form>
  );
};

export default ComboBox;
