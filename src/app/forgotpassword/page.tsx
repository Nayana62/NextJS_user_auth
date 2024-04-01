"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", { email });
      console.log(response);
      toast.success(response.data.message);
      //   router.push(response.request.responseUrl);
    } catch (error: any) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className=" text-2xl font-semibold m-5">Reset Password</h1>
      <form onSubmit={(e) => handleReset(e)}>
        <input
          type="email"
          name="email"
          id="email"
          required={true}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) {
              setError("");
            }
          }}
          className="p-2 border-none outline-none rounded-lg text-black"
          placeholder="Enter your email"
        />
        <button
          className=" border-none bg-cyan-950 p-2 rounded-lg ml-3"
          type="submit"
        >
          {loading ? <ScaleLoader /> : "reset"}
        </button>
        {error !== "" && <p className=" text-red-400 m-2">{error}</p>}
      </form>

      <Link href={"/signup"}>
        <p className="text-slate-100 hover:underline mt-10">create account</p>
      </Link>
    </div>
  );
}
