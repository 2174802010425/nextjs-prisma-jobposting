"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Check } from "lucide-react";
import { applyToJob } from "../actions/applicantsApplyJobs";
import { useRouter } from "next/navigation";

interface ApplyButtonProps {
  jobId: string;
}

export default function ApplyButton({ jobId }: ApplyButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleApply = () => {
    startTransition(async () => {
      const result = await applyToJob(jobId);

      setMessage(result.message);
      setIsSuccess(result.success);

      if (result.success) {
        setTimeout(() => {
          router.refresh();
        }, 1500);
      } else {
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    });
  };

  return (
    <div className="space-y-3">
      <Button
        onClick={handleApply}
        disabled={isPending || isSuccess}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Đang xử lý...
          </>
        ) : isSuccess ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Đã ứng tuyển
          </>
        ) : (
          "Ứng tuyển ngay"
        )}
      </Button>

      {message && (
        <div
          className={`text-sm text-center p-3 rounded-lg ${
            isSuccess
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
