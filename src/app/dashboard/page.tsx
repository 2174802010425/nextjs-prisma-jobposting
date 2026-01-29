import { prisma } from "../../../libs/prisma";
import { Users, Briefcase, FileText } from "lucide-react";
function StatCard({
  title,
  icon,
  value,
}: {
  title: string;
  icon: React.ReactNode;
  value: number | string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
      <div className="w-12 h-12 bg-zinc-900 text-white flex items-center justify-center rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm text-zinc-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const [totalUsers, totalJobs, totalApplications] = await Promise.all([
    prisma.user.count({ where: { role: "USER" } }),
    prisma.job.count(),
    prisma.application.count(),
  ]);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-zinc-500">Tổng quan hệ thống</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Users" value={totalUsers} icon={<Users />} />
        <StatCard title="Jobs" value={totalJobs} icon={<Briefcase />} />
        <StatCard
          title="Applications"
          value={totalApplications}
          icon={<FileText />}
        />
      </div>
    </div>
  );
}
