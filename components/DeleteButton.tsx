"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  };

  return (
    <>
      
      <Button
        onClick={() => setOpen(true)}
        className="text-red-600 hover:text-red-800"
        title="Xoá bài đăng"
      >
        <Trash2 size={16} />
      </Button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal box */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in">
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
              <AlertTriangle size={22} />
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 text-center">
              Xác nhận xoá bài đăng
            </h3>

            <p className="text-gray-600 text-sm text-center mt-3 leading-relaxed">
              Hành động này <span className="font-semibold">không thể hoàn tác</span>.
              <br />
              Bạn có chắc chắn muốn xoá bài đăng này không?
            </p>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <Button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
              >
                Huỷ
              </Button>

              <Button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-700 transition disabled:opacity-60"
              >
                {loading ? "Đang xoá..." : "Xoá"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
