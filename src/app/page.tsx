import Link from "next/link";
import { Briefcase, MapPin, Search } from "lucide-react";
import { prisma } from "../../libs/prisma";

function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k+`;
  }
  return `${num}+`;
}

export default async function HomePage() {
  const [jobCount, companyCount, userCount, featuredJobs] = await Promise.all([
    // job count
    prisma.job.count(),
    // count company
    prisma.job
      .findMany({
        select: { company: true },
        distinct: ["company"],
      })
      .then((companies) => companies.length),
    // count applicants
    prisma.user.count({ where: { role: "USER" } }),
    // count featured jobs
    prisma.job.findMany({
      take: 3,
      orderBy: { postedAt: "desc" },
      include: { postedBy: true },
    }),
  ]);

  const stats = [
    { label: "Việc làm", value: formatNumber(jobCount) },
    { label: "Công ty", value: formatNumber(companyCount) },
    { label: "Ứng viên", value: formatNumber(userCount) },
  ];

  return (
    <div className="space-y-24">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-600 to-blue-500" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Find your next <br />
            <span className="text-indigo-200">dream job</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-indigo-100">
            Khám phá hàng trăm cơ hội việc làm từ các công ty hàng đầu. Nhanh
            chóng. Đơn giản. Hiệu quả.
          </p>

          {/* Search box */}
          <form
            action="/jobs"
            method="GET"
            className="mt-12 bg-white rounded-2xl p-4 flex flex-col md:flex-row gap-4 shadow-2xl max-w-3xl"
          >
            <div className="flex items-center gap-3 flex-1 px-4">
              <Briefcase className="text-gray-400" />
              <input
                name="q"
                placeholder="Vị trí công việc (Frontend, Backend...)"
                className="w-full outline-none text-gray-800 placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              <Search size={18} />
              Tìm việc
            </button>
          </form>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl p-8 shadow-sm border text-center"
            >
              <h3 className="text-3xl font-bold text-gray-900">{item.value}</h3>
              <p className="mt-2 text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Việc làm nổi bật</h2>
          <Link
            href="/jobs"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Xem tất cả →
          </Link>
        </div>

        {featuredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{job.company}</p>
                  </div>
                  <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>

                <div className="mt-4 text-sm text-gray-600 flex items-center gap-2">
                  <MapPin size={16} className="text-gray-400" />
                  {job.location}
                  {job.salary && ` · ${job.salary}`}
                </div>

                <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                  {job.description}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {job.postedBy.name}
                  </span>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="text-indigo-600 font-semibold hover:underline text-sm"
                  >
                    Xem chi tiết →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <p className="text-gray-500">
              Chưa có công việc nào. Hãy là người đầu tiên{" "}
              <Link
                href="/jobs/post"
                className="text-indigo-600 hover:underline"
              >
                đăng tin tuyển dụng
              </Link>
              !
            </p>
          </div>
        )}
      </section>

      {/* ================= CTA ================= */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-indigo-600 rounded-3xl px-10 py-14 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold">Bạn đang tuyển dụng?</h2>
            <p className="mt-2 text-indigo-100">
              Đăng tin tuyển dụng và tiếp cận hàng nghìn ứng viên tiềm năng.
            </p>
          </div>

          <Link
            href="/jobs/post"
            className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition"
          >
            Đăng tuyển ngay
          </Link>
        </div>
      </section>
    </div>
  );
}
