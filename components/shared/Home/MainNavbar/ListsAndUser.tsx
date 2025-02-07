/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ShoppingCart } from "lucide-react";
import AuthButtons from "./AuthButtons";
import ProfileDropdown from "./ProfileDropdown";
import Wishlist from "./Wishlist";
import { useEffect, useState } from "react";

const ListsAndUser = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);
  return (
    <div className="flex items-center gap-7">
      <div className="flex items-center gap-2">
        <ShoppingCart /> <span>Cart</span>
      </div>
      <div className="flex items-center gap-2">
        <Wishlist />
      </div>
      <div className="flex items-center gap-2">
        {user ? <ProfileDropdown /> : <AuthButtons />}
      </div>
    </div>
  );
};

export default ListsAndUser;
