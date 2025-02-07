"use client";

import { SignupForm } from "@/components/shared/SignupForm";
import { redirect } from "next/navigation";

const SignUpPage = () => {
  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER) {
    const user = localStorage.getItem("user");
    if (user) {
      redirect("/");
    }
  }
  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default SignUpPage;
