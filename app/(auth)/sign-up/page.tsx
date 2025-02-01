"use client";

import { SignupForm } from "@/components/shared/SignupForm";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  if (user) {
    redirect("/");
  }
  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default page;
