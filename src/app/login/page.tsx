"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/contexts/authContext";
import { axiosClient } from "@/lib/useAxios";
import { postLogin } from "@/utils/functions/postLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [formEmail, setFormEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { setIsAuth, setUserId, loginStep, setLoginStep } =
    useContext(AuthContext);
  const mediumScreenMatches = window.matchMedia("(min-width: 768px)").matches;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObject = Object.fromEntries(formData);

    if (loginStep === 1) {
      const email = formDataObject.loginEmail as string;
      checkAuthOptions(email);
      setLoginStep(2);
    } else {
      const payload = {
        email: formDataObject.loginEmail as string,
        password: formDataObject.loginPassword as string,
      };

      const { data } = await axiosClient.post("/auth/login", payload);

      postLogin({
        response: data,
        setAuth: setIsAuth,
        setId: setUserId,
        router: router,
        user: payload,
      });
      setLoginStep(1);
    }
  };

  const checkAuthOptions = async (email: string) => {
    // call auth options endpoint
    const { data } = await axiosClient.post("/auth/auth-options", { email });
    console.log("data", data);
  };

  const loginWithGoogle = async (credentials: CredentialResponse) => {
    const { data } = await axiosClient.post("/auth/login-google", credentials);

    postLogin({
      response: data,
      setAuth: setIsAuth,
      setId: setUserId,
      router: router,
      user: data,
    });
  };

  useEffect(() => {
    if (!formEmail) {
      setLoginStep(1);
    }
  }, [formEmail, setLoginStep]);

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center p-7">
      <Card className="w-[440px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="p-8 h-full">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full gap-y-6">
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="loginEmail">Email</Label>
                <Input
                  id="loginEmail"
                  name="loginEmail"
                  autoComplete="username"
                  onChange={(event) => setFormEmail(event.target.value)}
                />
              </div>

              {loginStep === 1 ? null : (
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="loginPassword">Password</Label>
                  <Input
                    id="loginPassword"
                    type="password"
                    name="loginPassword"
                    autoComplete="current-password"
                  />
                </div>
              )}

              <Button>Continue</Button>

              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  loginWithGoogle(credentialResponse);
                }}
                onError={() => {
                  // eslint-disable-next-line no-console
                  console.log("Login Failed");
                }}
                size="large"
                width={mediumScreenMatches ? "374px" : "292px"}
              />

              <Link href="/register">Register a new account instead</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
