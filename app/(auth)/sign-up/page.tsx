"use client";

import { SignupForm } from "@/components/shared/SignupForm";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const SignUpPage = () => {
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
      <SignupForm />
    </div>
  );
};

export default SignUpPage;
