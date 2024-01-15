"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex bg-slate-50 items-center justify-center p-7">
      <div className="flex flex-col gap-4">
        <h1>Welcome to the auth-app</h1>
        <h2>You are currently logged out</h2>
        <Button type="button" onClick={() => router.push("/login")}>
          Login
        </Button>
      </div>
    </div>
  );
}
