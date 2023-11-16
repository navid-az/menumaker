"use client";

import handleSubmit from "@/app/lib/handleSubmit";

let code = [];
var obj = {};
function DigitInput({ userCredential, isPhoneNumber }) {
  console.log(userCredential, isPhoneNumber, "yes bro");
  const handleValue = (e) => {
    let newValue = e.target.value;
    code.push(newValue);

    if (code.length == 6) {
      obj["code"] = code.join("");
      if (isPhoneNumber) {
        obj["phone_number"] = userCredential;
        handleSubmit(obj, "http://127.0.0.1:8000/api/validate-code");
      } else {
        obj["email"] = userCredential;
        handleSubmit(obj, "http://127.0.0.1:8000/api/validate-code");
      }
    }
  };
  return (
    <input
      onChange={handleValue}
      type="text"
      maxLength="1"
      className="h-16 w-1/3 rounded-lg border-2 border-sad-blue bg-white p-2 text-center outline-none transition-all duration-300 ease-in-out autofill:bg-inherit focus:scale-110 focus:border-royal-green"
    />
  );
}

export default function SixDigitInput({ userCredential, isPhoneNumber }) {
  return (
    <div className="flex h-auto w-full gap-2 px-10">
      <DigitInput
        userCredential={userCredential}
        isPhoneNumber={isPhoneNumber}
      ></DigitInput>
      <DigitInput
        userCredential={userCredential}
        isPhoneNumber={isPhoneNumber}
      ></DigitInput>
      <DigitInput
        userCredential={userCredential}
        isPhoneNumber={isPhoneNumber}
      ></DigitInput>
      <DigitInput
        userCredential={userCredential}
        isPhoneNumber={isPhoneNumber}
      ></DigitInput>
      <DigitInput
        userCredential={userCredential}
        isPhoneNumber={isPhoneNumber}
      ></DigitInput>
      <DigitInput
        userCredential={userCredential}
        isPhoneNumber={isPhoneNumber}
      ></DigitInput>
    </div>
  );
}
