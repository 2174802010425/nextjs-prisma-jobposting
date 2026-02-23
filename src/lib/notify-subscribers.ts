"use server";
import { prisma } from "../../libs/prisma";
import { transporter } from "./mailer";
import { Job } from "@/generated/prisma";

export default async function NotifySubscriber(job: Job) {
  const subscribers = await prisma.subscriber.findMany({
    where: {
      isActive: true,
    },
  });
  const matched = subscribers.filter((sub) => {
    // lọc địa điểm công việc
    const locationsMatch =
      !sub.location ||
      job.location.toLowerCase().includes(sub.location.toLowerCase());
    return locationsMatch;
  });
  if (matched.length === 0) return;
}
