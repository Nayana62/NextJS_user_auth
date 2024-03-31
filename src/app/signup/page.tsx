"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      router.push("/login");
      toast.success(response.data.message, { position: "top-right" });
    } catch (error: any) {
      toast.error(error.response.data.error, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className=" text-2xl font-semibold m-5">Signup</h1>

      <form onSubmit={(e) => onSignup(e)} className="flex flex-col gap-5">
        <input
          type="text"
          required={true}
          className="p-2 border-none outline-none rounded-lg text-black"
          id="username"
          placeholder="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="email"
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
          {loading ? <ScaleLoader color="#36d7b7" height="20" /> : "Signup"}
        </button>
        <div className=" flex gap-2 text-sm">
          <p>Already have an account?</p>
          <Link href="/login">
            <p className=" text-slate-100 hover:underline">Login</p>
          </Link>
        </div>
      </form>
      <Toaster />
    </div>
  );
}
