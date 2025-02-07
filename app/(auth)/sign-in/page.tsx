"use client";

import { SigninForm } from "@/components/shared/SigninForm";
import { redirect } from "next/navigation";

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
      <SigninForm />
    </div>
  );
};

export default page;
