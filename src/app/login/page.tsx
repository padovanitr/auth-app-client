"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormikProvider, Form, useFormik } from "formik";
import Link from "next/link";
import React from "react";

export default function Login() {
  const handleSubmit = () => {};

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center p-7">
      <Card className="w-[440px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="p-8 h-full">
          <FormikProvider value={formik}>
            <Form>
              <div className="flex flex-col w-full gap-y-4">
                <Input name="email" placeholder="email" />
                <Input placeholder="password" type="password" name="password" />
                <Button>Submit</Button>
                <Link href="/register">Register a new account instead</Link>
              </div>
            </Form>
          </FormikProvider>
        </CardContent>
      </Card>
    </div>
  );
}
