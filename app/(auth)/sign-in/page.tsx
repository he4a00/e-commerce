"use client";

import { SigninForm } from "@/components/shared/SigninForm";
import { redirect } from "next/navigation";

const page = () => {
  const user = localStorage.getItem("user");
  if (user) {
    redirect("/");
  }

  return (
    <div>
      <SigninForm />
    </div>
  );
};

export default page;
