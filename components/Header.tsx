"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="h-16 border-b bg-white dark:bg-zinc-900 px-6 flex items-center justify-between">
      <span className="font-semibold">Admin</span>

      <div>
        <Link href={'/jobs/post'}>
          <Button className="mr-4 cursor-pointer">Create job</Button>
        </Link>

        <Button variant="outline" onClick={() => signOut()}>
          Logout
        </Button>
      </div>
    </header>
  );
}
