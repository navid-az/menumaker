import { redirect } from "next/dist/server/api-utils";

export default async function handleSubmit(
  data, //email or phone_number
  endpoint
) {
  alert(data["phone_number"], data["code"]);
  console.log(data);
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    alert("SUCCESS");
  }
  return response.json();
}
// async function GoHome() {
//   const fetchResult = await handleSubmit();
//   if (fetchResult) {
//     redirect("/builder");
//   }
// }
// async function getData() {
//   const res = await fetch("http://127.0.0.1:8000/api/", {
//     method: "GET",
//     headers: { Accept: "application/json", "Content-Type": "application/json" },
//   });
//   return res.json();
// }
// export default async function handleSubmit() {
//   const codes = await getData();
//   console.log(codes);
//   return (
//     <div>
//       {codes.map((code) => (
//         <div>
//           this is post number {code.id} and the title is {code.phone_number}
//         </div>
//       ))}
//     </div>
//   );
// }
