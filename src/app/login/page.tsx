"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      router.push("/profile");
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className=" text-2xl font-semibold m-5">Login</h1>

      <form onSubmit={(e) => onLogin(e)} className="flex flex-col gap-5">
        <input
          type="text"
          required={true}
          className="p-2 border-none outline-none rounded-lg text-black"
          id="email"
          placeholder="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          required={true}
          className="p-2 border-none outline-none rounded-lg text-black"
          id="password"
          placeholder="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          type="submit"
          className=" border-none bg-cyan-950 p-2 rounded-lg"
        >
          {loading ? <ScaleLoader color="#36d7b7" height="20" /> : "Login"}
        </button>
        <div className=" flex gap-2 text-sm">
          <p>Don&apos;t have an account?</p>
          <Link href="/signup">
            <p className=" text-slate-100 hover:underline">Signup</p>
          </Link>
        </div>
      </form>
      <Link href={"/forgotpassword"}>
        <p className="text-slate-100 hover:underline mt-2">forgot password?</p>
      </Link>
    </div>
  );
}
