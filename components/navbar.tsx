import Link from "next/link";
import { Button } from "./ui/button";
import { getSession } from "@/lib/getsession";
import { signOut } from "@/auth";
import { revalidatePath } from "next/cache";

export async function Navbar() {
  const session = await getSession();
  const user = session?.user;

  return (
    <nav className="flex justify-around items-center py-4 bg-[#141414] text-white">
      <Link href="/" className="text-xl font-bold">
        Home
      </Link>

      <ul className="hidden md:flex space-x-4 list-none clear-start">
        {!user ? (
          <>
            <li className="mt-2">
              <Link href="/login" className="hover:text-gray-400">
                Login
              </Link>
            </li>
            <li className="mt-2">
              <Link href="/register" className="hover:text-gray-400">
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="mt-2">
              <Link href="/private/dashboard" className="hover:text-gray-400">
                Dashboard
              </Link>
            </li>
            <form
              action={async () => {
                "use server";
                await signOut();
                revalidatePath("/");
              }}
            >
              <Button variant="ghost">Logout</Button>
            </form>
          </>
        )}
      </ul>
    </nav>
  );
}
