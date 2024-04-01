import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <header className=" p-5 px-10 flex justify-end items-center gap-10">
        <Link href="/profile">
          <p>Profile</p>
        </Link>
      </header>
      <div className=" h-[40rem] flex justify-center items-center">
        <h1 className="text-3xl">Welcome</h1>
      </div>
    </div>
  );
}
