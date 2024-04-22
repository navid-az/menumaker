// import React from "react";
// import { useState, useContext, useEffect } from "react";
// import { FormDataContext } from "../(creator)/builder/components/builderForm";

// type RadioBtnProps = {
//   id: string;
//   name: string;
//   value: string;
// };

// export function RadioBtn({ id, name, value }: RadioBtnProps) {
//   const [btnStatus, setBtnStatus] = useState(0);
//   const formData = useContext(FormDataContext);

//   //   useEffect(() => {
//   //     if (formData[name] == value) {
//   //       setBtnStatus((prev) => !prev);
//   //     }
//   //   }, []);

//   // useEffect(() => {
//   //   action(btnStatus);
//   // }, [btnStatus]);

//   return (
//     <input
//       className="m-0 grid h-6 w-6 cursor-pointer appearance-none place-content-center rounded-full border-2 border-solid border-royal-green content-none before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-royal-green before:transition-transform before:duration-200 before:ease-in-out checked:before:scale-100 sm:h-7 sm:w-7 before:sm:h-5 before:sm:w-5"
//       type="radio"
//       id={id}
//       name={name}
//       value={value}
//       //   onClick={() => setBtnStatus((prev) => !prev)}
//     />
//   );
// }
