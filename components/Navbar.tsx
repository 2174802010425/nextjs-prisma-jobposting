"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { logout } from "../actions/authActions";
import { useTheme } from "next-themes";
import { Moon, Sun, LogOut, User, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const avatar =
    session?.user?.image ||
    `https://ui-avatars.com/api/?name=${session?.user?.name}`;

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="text-lg font-semibold">Job Board</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/jobs" className="text-sm font-medium hover:text-primary">
            Browse Jobs
          </Link>

          {session?.user?.role === "ADMIN" && (
            <>
              <Link
                href="/jobs/post"
                className="text-sm font-medium hover:text-primary"
              >
                Post a Job
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:text-primary"
              >
                Dashboard
              </Link>
            </>
          )}

          {!session ? (
            <Link
              href="/auth/signin"
              className="text-sm font-medium hover:text-primary"
            >
              Sign In
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full focus:outline-none">
                  <img
                    src={avatar}
                    className="w-8 h-8 rounded-full border"
                    alt="avatar"
                  />
                  <span className="text-sm font-medium hidden sm:block">
                    {session.user.name}
                  </span>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  Signed in as
                  <div className="text-xs text-muted-foreground truncate">
                    {session.user.email}
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User size={16} /> Profile
                  </Link>
                </DropdownMenuItem>

                {session.user.role === "ADMIN" && (
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <LayoutDashboard size={16} /> Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                  }
                  className="flex items-center gap-2"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun size={16} /> Light mode
                    </>
                  ) : (
                    <>
                      <Moon size={16} /> Dark mode
                    </>
                  )}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => logout()}
                  className="flex items-center gap-2 text-red-600"
                >
                  <LogOut size={16} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
