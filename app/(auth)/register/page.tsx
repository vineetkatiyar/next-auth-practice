import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { register } from "@/atcions/user";
import { getSession } from "@/lib/getsession";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await getSession();
  const user = session?.user;

  if (user) redirect("/");

  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded-none  p-4 md:p-8 shadow-input bg-white border">
      <h1 className="text-center text-2xl font-bold">Register</h1>
      <form action={register} className="items-center justify-center">
        <div className="mt-4">
          <Label className="" htmlFor="name">
            Name
            <Input type="text" id="name" name="name" placeholder="John Doe" />
          </Label>
        </div>
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
          <Button className="w-full">Register</Button>
        </div>
      </form>
      <div className="text-end mt-3 underline">
        <Link className="" href="/login">
          Already have an account? login
        </Link>
      </div>
    </div>
  );
}
