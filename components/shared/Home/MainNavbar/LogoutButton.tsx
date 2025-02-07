"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

const LogoutButton = ({ text }: { text: string }) => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
    redirect("/");
  };
  return (
    <Button onClick={handleLogout}>
      {text} <LogOut className="w-5 h-5" />
    </Button>
  );
};

export default LogoutButton;
