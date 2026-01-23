import { prisma } from "../../../../libs/prisma";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { format } from "date-fns";
import { auth } from "../../../../auth";
import DeleteButton from "../../../../components/DeleteButton";
export default async function JobDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const job = await prisma.job.findUnique({
    where: { id },
  });

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-semibold text-gray-800">
          Không tìm thấy công việc
        </h2>
        <Link href="/jobs" className="mt-4 text-blue-600 hover:underline">
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/jobs"
            className="flex items-center text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium">Quay lại</span>
          </Link>
          <button className="p-2 hover:bg-gray-100 rounded-full transition text-gray-500">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    {job.title}
                  </h1>
                  <p className="text-xl text-blue-600 font-medium mt-2">
                    {job.company}
                  </p>
                </div>
                <div className="hidden sm:block">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-400">
                    {job.company.charAt(0)}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                  <Briefcase size={14} className="mr-1.5" />
                  {job.type}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-100">
                  <DollarSign size={14} className="mr-1.5" />
                  {job.salary}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-50 text-gray-700 border border-gray-200">
                  <MapPin size={14} className="mr-1.5" />
                  {job.location}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-1 h-6 bg-blue-600 rounded-full mr-3"></span>
                Mô tả công việc
              </h2>
              <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
                <p className="whitespace-pre-line">
                  {job.description ||
                    "Chưa có mô tả chi tiết cho công việc này."}
                </p>
              </div>
            </div>
          </div>

          {/* Cột Phải: Sidebar thông tin tóm tắt */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-5 text-center">
                  Tóm tắt thông tin
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <Clock size={18} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        Ngày đăng
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {format(job.postedAt, "MM/dd/yyy")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <MapPin size={18} className="text-red-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        Địa điểm
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {job.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <DollarSign size={18} className="text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        Mức lương
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {job.salary}
                      </p>
                    </div>
                  </div>
                </div>

                {session?.user.role === "ADMIN" && (
                  <div className="mt-8 space-y-3">
                    <Link
                      href={`/jobs/${job.id}/edit`}
                      className="block w-full text-center mt-4 text-gray-600 bg-gray-100 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
                    >
                      Chỉnh sửa bài đăng
                    </Link>
                    <DeleteButton jobId={job.id}/>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
