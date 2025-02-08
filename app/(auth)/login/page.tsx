import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { login } from "@/atcions/user";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getsession";

export default async function Login() {
  const session = await getSession();
  // console.log(session?.user);
  const user = session?.user;
  if (user) redirect("/");

  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded-none  p-4 md:p-8 shadow-input bg-white border">
      <h1 className="text-center text-2xl font-bold">Login</h1>
      <form action={login} className="items-center justify-center">
        <div className="mt-4">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.comx"
            className=""
          />
        </div>
        <div className="mt-4">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" />
        </div>
        <div className="mt-4">
          <Button className="w-full">Login</Button>
        </div>
      </form>

      <div className="text-end mt-3 underline">
        <Link className="" href="/register">
          dont have an account? Register
        </Link>
      </div>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
        className="w-full flex"
      >
        <button className="w-full flex items-center justify-center mt-3 bg-black p-2 rounded-md ">
          <IconBrandGoogle className="text-white mx-2" />
          <div className="text-white">Google</div>
        </button>
      </form>
    </div>
  );
}
