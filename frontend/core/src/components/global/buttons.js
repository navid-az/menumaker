// "use client";

// import { useState, useContext, useEffect } from "react";
// import { FormDataContext } from "../(creator)/builder/components/builderForm";

// export function RadioBtn({ id, name, value, action = "" }) {
//   const [btnStatus, setBtnStatus] = useState(0);
//   const formData = useContext(FormDataContext);

//   useEffect(() => {
//     if (formData[name] == value) {
//       setBtnStatus((prev) => !prev);
//     }
//   }, []);

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
//       onClick={() => setBtnStatus((prev) => !prev)}
//     />
//   );
// }

// export function ToggleBtn({ id, action }) {
//   const [btnStatus, setBtnStatus] = useState(0);

//   const handleToggle = () => {
//     var toggleSwitch = document.querySelector(`label>div[id=${id}]`);
//     var toggleBg = document.querySelector(`label[for=${id}]`);

//     if (btnStatus == 0) {
//       toggleSwitch.style.left = "30px";
//       toggleBg.style.background = "#0F2C30";
//       toggleSwitch.style.background = "#94D9E2";
//       setBtnStatus(!btnStatus);
//     } else {
//       toggleSwitch.style.left = "3px";
//       toggleBg.style.background = "none";
//       toggleSwitch.style.background = "#0F2C30";
//       setBtnStatus(!btnStatus);
//     }
//     action(btnStatus);
//   };
//   return (
//     <>
//       <input className="hidden" type="checkbox" id={id} />
//       <label
//         className="relative flex h-7 w-14 cursor-pointer items-center rounded-full border-2 border-royal-green bg-none transition-all duration-200 ease-in-out "
//         htmlFor={id}
//         onClick={handleToggle}
//       >
//         <div
//           id={id}
//           className="absolute left-[3px] h-5 w-5 rounded-full bg-royal-green transition-all content-none duration-200"
//         ></div>
//       </label>
//     </>
//   );
// }
