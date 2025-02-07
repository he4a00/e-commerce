"use client";

import { SigninForm } from "@/components/shared/SigninForm";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const SignInPage = () => {
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      redirect("/");
    }
  }, []);

  return (
    <div>
      <SigninForm />
    </div>
  );
};

export default SignInPage;
