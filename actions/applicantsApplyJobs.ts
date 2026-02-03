"use server";

import { auth } from "../auth";
import { prisma } from "../libs/prisma";
import { revalidatePath } from "next/cache";

type ActionResult = {
  success: boolean;
  message: string;
  data?: any;
};

export async function applyToJob(jobId: string): Promise<ActionResult> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "Bạn cần đăng nhập để ứng tuyển",
      };
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });
    // check applied job
    const jobApplied = await prisma.application.findFirst({
      where: { id: job?.id },
    });
    if (jobApplied) {
      return {
        success: false,
        message: "Bạn đã ứng tuyển vào công việc này rồi",
      };
    }
    // check if there is a job
    if (!job) {
      return {
        success: false,
        message: "Không tìm thấy công việc này",
      };
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        userId: session.user.id,
        status: "Pending",
      },
    });

    revalidatePath(`/jobs/${jobId}`);

    return {
      success: true,
      message: "Ứng tuyển thành công! Chúng tôi sẽ xem xét hồ sơ của bạn.",
      data: application,
    };
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        success: false,
        message: "Bạn đã ứng tuyển vào công việc này rồi",
      };
    }

    console.error("Error applying to job:", error);
    return {
      success: false,
      message: "Có lỗi xảy ra. Vui lòng thử lại sau.",
    };
  }
}
