"use client";

import { SignupForm } from "@/components/shared/SignupForm";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  let user = null;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
  }
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
