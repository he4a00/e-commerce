"use client";

import { useLogoutUserMutation } from "@/app/store/slices/api/user/userSlice";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

const LogoutButton = ({ text }: { text: string }) => {
  const [logoutUser, { isLoading, isSuccess }] = useLogoutUserMutation();
  if (isSuccess) {
    redirect("/");
  }
  return (
    <Button onClick={() => logoutUser({})} disabled={isLoading}>
      {text} <LogOut className="w-5 h-5" />
    </Button>
  );
};

export default LogoutButton;
