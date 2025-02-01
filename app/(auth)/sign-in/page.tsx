"use client";

import { SigninForm } from "@/components/shared/SigninForm";
import { redirect } from "next/navigation";

const page = () => {
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
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
