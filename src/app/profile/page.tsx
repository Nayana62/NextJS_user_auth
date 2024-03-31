"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<{ username: string; id: string }>({
    username: "",
    id: "",
  });

  const handleLogout = async () => {
    try {
      const response = await axios.get("api/users/logout");
      router.push("/login");
      toast.success(response.data.message, { position: "top-right" });
    } catch (error: any) {
      toast.error(error.response.data.error, { position: "top-right" });
    }
  };

  const getUserDetails = async () => {
    try {
      const user = await axios.get("/api/users/me");
      setUserData({
        username: user.data.data.username,
        id: user.data.data._id,
      });
      console.log("userData", userData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className=" text-2xl font-semibold m-5">Profile Page</h1>
      <hr />
      <Link href={`/profile/${userData.id}`}>
        <h2 className=" my-4 p-2 bg-green-400 rounded-lg">
          {userData.username}
        </h2>
      </Link>
      <button
        onClick={handleLogout}
        className="border-none bg-cyan-950 p-2 rounded-lg"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="border-none bg-cyan-950 p-2 rounded-lg"
      >
        Get user Details
      </button>
      <Toaster />
    </div>
  );
}
