"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/contexts/authContext";
import { axiosClient } from "@/lib/useAxios";
import { postLogin } from "@/utils/functions/postLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import React, { FormEvent, useContext } from "react";

export default function Register() {
  const router = useRouter();
  const { setIsAuth, setUserId } = useContext(AuthContext);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formDataObject = Object.fromEntries(formData);

    const payload = {
      name: formDataObject.registerName as string,
      email: formDataObject.registerEmail as string,
      password: formDataObject.registerPassword as string,
    };

    const { data } = await axiosClient.post("/auth/register", payload);

    postLogin({
      response: data,
      setAuth: setIsAuth,
      setId: setUserId,
      router: router,
      user: payload,
      toast,
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center p-7">
      <Card className="w-[440px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent className="p-8 h-full">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full gap-y-6">
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="registerName">Your name</Label>
                <Input
                  id="registerName"
                  name="registerName"
                  autoComplete="name"
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <Label htmlFor="registerEmail">Email</Label>
                <Input
                  id="registerEmail"
                  name="registerEmail"
                  autoComplete="username"
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <Label htmlFor="registerPassword">Password</Label>
                <Input
                  id="registerPassword"
                  type="password"
                  name="registerPassword"
                  autoComplete="new-password"
                />
              </div>
              <Button type="submit">Register an account</Button>
              <Link href="/login">
                Already have an account? Proceed to login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
