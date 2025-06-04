"use client";
import { useRouter } from "next/navigation";

export default function AccountLogin() {
  const router = useRouter();

  if (window.location.pathname.includes("/account")) {
    router.push("/account/profile");
  }
  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg">
      {/* <LoginHeader /> */}
      <main className="flex-1"></main>
    </div>
  );
}
