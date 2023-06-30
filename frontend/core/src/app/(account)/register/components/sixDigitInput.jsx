"use client";

import handleSubmit from "@/app/lib/handleSubmit";

let code = [];
function DigitInput({ credentialType, userCredential }) {
  const handleValue = (e) => {
    let newValue = e.target.value;
    code.push(newValue);
    console.log(code.join(""));
    if (code.length == 6) {
      handleSubmit({ credentialType: userCredential, code: code });
    }
  };
  return (
    <input
      onChange={handleValue}
      type="text"
      maxLength="1"
      className="h-16 w-1/3 rounded-lg border-2 border-sad-blue bg-white p-2 text-center outline-none transition-all duration-300 ease-in-out autofill:bg-inherit focus:scale-110 focus:border-royale-green"
    />
  );
}

export default function SixDigitInput() {
  return (
    <div className="flex h-auto w-full gap-2 px-10">
      <DigitInput id={1}></DigitInput>
      <DigitInput id={2}></DigitInput>
      <DigitInput id={3}></DigitInput>
      <DigitInput id={4}></DigitInput>
      <DigitInput id={5}></DigitInput>
      <DigitInput id={6}></DigitInput>
    </div>
  );
}
