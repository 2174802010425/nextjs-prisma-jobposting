"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ jobId }: { jobId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);

    const res = await fetch(`/api/jobs/${jobId}`, {
      method: "DELETE",
    });

    setLoading(false);

    if (!res.ok) {
      alert("Không thể xoá bài đăng");
      return;
    }

    router.push("/jobs");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="block w-full text-center bg-red-50 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-100 transition"
      >
        Xoá bài đăng
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-900">
              Xác nhận xoá bài đăng
            </h3>
            <p className="text-gray-600 mt-2">
              Hành động này <b>không thể hoàn tác</b>. Bạn có chắc chắn muốn
              xoá?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
              >
                Huỷ
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? "Đang xoá..." : "Xoá"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
