"use client";

import { SignupForm } from "@/components/shared/SignupForm";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const SignUpPage = () => {
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      redirect("/");
    }
  }, []);
  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default SignUpPage;
