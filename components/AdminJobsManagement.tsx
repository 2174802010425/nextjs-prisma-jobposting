"use client";
import Link from "next/link";
import { Eye, Pencil } from "lucide-react";
import DeleteButton from "./DeleteButton";
const AdminJobsManagement = ({ job }: any) => {
  return (
    <tr key={job.id} className="border-b last:border-none hover:bg-zinc-50">
      {/* Title */}
      <td className="px-4 py-3 font-medium">{job.title}</td>

      {/* Company */}
      <td>{job.company}</td>

      {/* Type */}
      <td className="text-center">
        <span className="px-2 py-1 rounded-md text-xs bg-blue-100 text-blue-700">
          {job.type}
        </span>
      </td>

      {/* Location */}
      <td className="text-center">{job.location}</td>

      {/* Salary */}
      <td className="text-center">${job.salary}</td>

      {/* Date */}
      <td className="text-center">
        {new Date(job.postedAt).toLocaleDateString("vi-VN")}
      </td>

      {/* Actions */}
      <td className="px-4 py-3 text-right">
        <div className="inline-flex items-center gap-3">
          <Link
            href={`/dashboard/jobs/${job.id}`}
            className="text-zinc-600 hover:text-black"
            title="Xem"
          >
            <Eye size={16} />
          </Link>

          <Link
            href={`/jobs/${job.id}/edit`}
            className="text-blue-600 hover:text-blue-800"
            title="Sửa"
          >
            <Pencil size={16} />
          </Link>

          <DeleteButton jobId={job.id} />
        </div>
      </td>
    </tr>
  );
};

export default AdminJobsManagement;
