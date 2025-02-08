"use server";
import { signIn } from "@/auth";
import connectDB from "@/lib/db";
import { User } from "@/models/usermodels";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

export async function register(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    throw new Error("Please fill all fields");
  }
  //connect database
  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await hash(password, 10);

  await User.create({ name, email, password: hashedPassword });
  console.log(`User created successfully`);
  redirect("/login");
}

export const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }
  redirect("/");
};

export const getAllUsers = async () => {
  await connectDB();
  const user = await User.find({});
  return user;
};
