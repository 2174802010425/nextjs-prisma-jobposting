
import { prisma } from "../../../../libs/prisma";
import type { Job } from "@/generated/prisma";

import AdminJobsManagement from "../../../../components/AdminJobsManagement";
const page = async () => {
  const jobs: Job[] = await prisma.job.findMany({
    orderBy: { postedAt: "desc" },
  });

  if (jobs.length === 0) {
    return (
      <div className="py-12 text-center text-zinc-500">
        Chưa có bài đăng nào
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Jobs</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Quản lý các bài đăng tuyển dụng
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Vị trí</th>
              <th className="text-left">Công ty</th>
              <th className="text-center">Hình thức</th>
              <th className="text-center">Địa điểm</th>
              <th className="text-center">Lương</th>
              <th className="text-center">Ngày đăng</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <AdminJobsManagement key={job.id} job={job} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
