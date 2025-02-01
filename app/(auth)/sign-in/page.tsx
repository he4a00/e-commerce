/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { SigninForm } from "@/components/shared/SigninForm";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const SignInPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
