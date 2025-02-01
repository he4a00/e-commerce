"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const AuthButtons = () => {
  return (
    <div className="flex items-center gap-5">
      <Link href="/sign-in">
        <Button variant="outline">Login</Button>
      </Link>
      <Link href="/sign-up">
        <Button variant="outline">Register</Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
