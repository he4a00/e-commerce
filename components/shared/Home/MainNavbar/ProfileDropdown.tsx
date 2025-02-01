import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, Home, ShoppingBag, User } from "lucide-react";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
const ProfileDropdown = () => {
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user || "{}");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <User className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Profile
          <DropdownMenuShortcut>
            <User className="w-5 h-5" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Orders
          <DropdownMenuShortcut>
            <ShoppingBag className="w-5 h-5" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Wishlist
          <DropdownMenuShortcut>
            <Heart className="w-5 h-5" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {userData.roles.includes("ADMIN") && (
          <Link href="/admin">
            <DropdownMenuItem>
              Dashboard
              <DropdownMenuShortcut>
                <Home className="w-5 h-5" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton text="Logout" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
