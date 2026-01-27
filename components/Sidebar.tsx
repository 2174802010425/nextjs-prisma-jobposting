import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Settings,
} from "lucide-react";

const menu = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Jobs",
    href: "/dashboard/jobs",
    icon: Briefcase,
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-zinc-900 border-r">
      <div className="h-16 flex items-center px-6 font-bold text-lg">
        Admin Panel
      </div>

      <nav className="px-4 space-y-1">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
