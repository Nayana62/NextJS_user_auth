"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const resetPassword = async (newPassword: string) => {
    try {
      const response = await axios.post("/api/users/resetpassword", {
        token,
        newPassword,
      });
      console.log(response);
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      resetPassword(newPassword);
    } else {
      setError("confirm password not same");
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className=" text-2xl font-semibold m-5">Create new password</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="p-2 border-none outline-none rounded-lg text-black"
          type="password"
          name="newpassword"
          id="newpassword"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            if (error) {
              setError("");
            }
          }}
          placeholder="new password"
        />
        <input
          className="p-2 border-none outline-none rounded-lg text-black"
          type="password"
          name="confirmpassword"
          id="confirmpassword"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (error) {
              setError("");
            }
          }}
          placeholder="confirm password"
        />
        <button type="submit">reset password</button>
        {error !== "" && <p className=" text-red-400 m-2">{error}</p>}
      </form>
    </div>
  );
}
