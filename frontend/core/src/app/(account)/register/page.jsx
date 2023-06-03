import LoginBanner from "./banner";
import LoginForm from "./registerForm";

export default function Register() {
  return (
    <main className="flex flex-row">
      <LoginBanner></LoginBanner>
      <section className="container mx-auto flex h-screen w-fit flex-col items-center justify-center gap-7">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-black text-royale-green">خوش آمدید</h1>
          <p className="text-royale-green-light">
            لطفا مشخصات حساب خود را وارد کنید
          </p>
        </div>
        <LoginForm></LoginForm>
      </section>
    </main>
  );
}
