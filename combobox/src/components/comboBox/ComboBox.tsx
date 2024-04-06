import { useState } from "react";
import {
  autoUpdate,
  useFloating,
  useClick,
  useDismiss,
  offset,
  flip,
  size,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";

import styles from "./ComboBox.module.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UniService from "../../api/UniService";

const OFFSET = 10;

const ComboBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context, strategy } = useFloating({
    placement: "bottom-start",
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(OFFSET),
      flip(),
      size({
        apply: ({ availableHeight, elements }) => {
          Object.assign(elements.floating.style, {
            maxHeight: `${Math.max(50, availableHeight - OFFSET)}px`,
          });
        },
      }),
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  // // access to client
  // const queryClient = useQueryClient();

  // queries
  const { isLoading, error, data } = useQuery({
    queryKey: ["unis"],
    queryFn: () => UniService.getAllUnis,
  });
  // const { isLoading, error, data } = useQuery({
  //   queryKey: ["unis"],
  //   queryFn: () =>
  //     fetch("https://api.github.com/repos/TanStack/query").then((res) =>
  //       res.json()
  //     ),
  // });

  // // mutations
  // const mutation = useMutation({
  //   mutationFn: test,
  //   onSuccess: () => {
  //     // invalidate and refetch
  //     queryClient.invalidateQueries({queryKey: ["repoData"]})
  //   }
  // })

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <button {...getReferenceProps({ ref: refs.setReference })}>
        open dropdown
      </button>
      {isOpen && (
        <FloatingPortal>
          <div
            className={styles.dropdownContainer}
            {...getFloatingProps({
              ref: refs.setFloating,
              style: { ...floatingStyles, position: strategy },
            })}
          >
            <ul>
              {/* {data.map((index: any, item: any) => (
                <li key={index}>{item.name}</li>
              ))} */}
              {/* {data?.map((uni) => (
                <li key={uni.id}>{uni.name}</li>
              ))} */}
              {data.name}
              {/* {Array.from({ length: 100 }).map((_, index) => (
                <li key={index}>{index}. list item</li>
              ))} */}
            </ul>
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default ComboBox;

// import { useForm } from "react-hook-form";

// type FormData = {
//   firstName: string;
//   lastName: string;
// };

// const ComboBox = () => {
//   const {
//     register,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>();
//   const onSubmit = handleSubmit((data) => console.log(data));
//   // firstName and lastName will have correct type

//   return (
//     <form onSubmit={onSubmit}>
//       <label>First Name</label>
//       <input {...register("firstName")} />
//       <label>Last Name</label>
//       <input {...register("lastName")} />
//       <button
//         type="button"
//         onClick={() => {
//           setValue("lastName", "Smith"); // ✅
//           setValue("firstName", "John"); // ❌: true is not string
//           errors; // ❌: property bill does not exist
//         }}
//       >
//         SetValue
//       </button>
//     </form>
//   );
// };

// export default ComboBox;

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import "./styles.css";

// export default function App() {
//   const [successMsg, setSuccessMsg] = useState("");
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log(data);
//     setSuccessMsg("User registration is successful.");
//     reset();
//   };

//   return (
//     <div className="App">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {successMsg && <p className="success-msg">{successMsg}</p>}
//         <div className="form-control">
//           <label>Username</label>
//           <input
//             type="text"
//             {...register("username", {
//               required: "Username is required."
//             })}
//           />
//           {errors.username && (
//             <p className="errorMsg">{errors.username.message}</p>
//           )}
//         </div>
//         <div className="form-control">
//           <label>Email</label>
//           <input
//             type="text"
//             {...register("email", {
//               required: "Email is required.",
//               pattern: {
//                 value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
//                 message: "Email is not valid."
//               }
//             })}
//           />
//           {errors.email && <p className="errorMsg">{errors.email.message}</p>}
//         </div>
//         <div className="form-control">
//           <label>Password</label>
//           <input
//             type="password"
//             {...register("password", {
//               required: true,
//               validate: {
//                 checkLength: (value) => value.length >= 6,
//                 matchPattern: (value) =>
//                   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
//                     value
//                   )
//               }
//             })}
//           />
//           {errors.password?.type === "required" && (
//             <p className="errorMsg">Password is required.</p>
//           )}
//           {errors.password?.type === "checkLength" && (
//             <p className="errorMsg">
//               Password should be at-least 6 characters.
//             </p>
//           )}
//           {errors.password?.type === "matchPattern" && (
//             <p className="errorMsg">
//               Password should contain at least one uppercase letter, lowercase
//               letter, digit, and special symbol.
//             </p>
//           )}
//         </div>
//         <div className="form-control">
//           <label></label>
//           <button type="submit">Register</button>
//         </div>
//       </form>
//     </div>
//   );
// }
