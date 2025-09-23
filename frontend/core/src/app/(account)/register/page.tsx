import { CredentialForm } from "./components/CredentialForm";

//libraries
import { jwtVerify } from "jose";

//types
export type InviteData = {
  personnelId: number;
  email: string;
  firstName: string;
  lastName: string;
  exp: number;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  // Secret key for verifying the JWT ~~~~NEEDS CHANGE~~~~
  const secret = new TextEncoder().encode(
    "django-insecure-&@-4_u6z^b7xaq)l=7a@dh*3b%ac)$7d$5t0lkf3f#2@ky2&6e"
  );

  const { token } = await searchParams;
  let inviteData: InviteData | undefined;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      inviteData = {
        personnelId: payload.personnel_id as number,
        email: payload.email as string,
        firstName: payload.first_name as string,
        lastName: payload.last_name as string,
        exp: payload.exp as number,
      };

      // If the token is valid, render the registration form with pre-filled email
      return (
        <section className="container flex h-screen w-full flex-col items-center justify-center gap-7 px-4 lg:w-5/12 lg:px-24">
          <div className="flex w-full flex-col gap-2 text-right">
            <h1 className="text-3xl font-black text-royal-green">
              {inviteData.firstName} عزیز، خوش اومدی!
            </h1>
            <p className="text-royal-green-light">
              لطفا ایمیل یا شماره تلفن خودت رو وارد کن
            </p>
          </div>
          <CredentialForm inviteToken={token} inviteData={inviteData}></CredentialForm>
        </section>
      );
    } catch (err) {
      inviteData = undefined;
    }
  }
  return (
    <section className="container flex h-screen w-full flex-col items-center justify-center gap-7 px-4 lg:w-5/12 lg:px-24">
      <div className="flex w-full flex-col gap-2 text-right">
        <h1 className="text-3xl font-black text-royal-green">ورود | ثبت نام</h1>
        <p className="text-royal-green-light">
          لطفا ایمیل یا شماره تلفن خودت رو وارد کن
        </p>
      </div>
      <CredentialForm inviteData={inviteData}></CredentialForm>
    </section>
  );
}
