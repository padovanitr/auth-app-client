"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormikProvider, Form, useFormik } from "formik";

import React from "react";

export default function Register() {
  const handleSubmit = () => {};

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center p-7">
      <Card className="w-[440px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent className="p-8 h-full">
          <FormikProvider value={formik}>
            <Form>
              <div className="flex flex-col w-full gap-y-4">
                <Input placeholder="your name" name="name" />
                <Input name="email" placeholder="email" />
                <Input placeholder="password" type="password" name="password" />
                <Button>Register an account</Button>
              </div>
            </Form>
          </FormikProvider>
        </CardContent>
      </Card>
    </div>
  );
}
