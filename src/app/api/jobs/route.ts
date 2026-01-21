import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../../../libs/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || !session) {
    return NextResponse.json({ message: "Please login to post a job!"}, {status : 401});
  }
  if (session.user.role !== 'ADMIN') {
    return NextResponse.json({message : 'Forbidden'}, {status : 403})
  }
  try {
    const data = await req.json();

    const job = await prisma.job.create({
      data: {
        ...data,
        postedById: session.user.id,
      },
    });
    return NextResponse.json({ success: true, job });
  } catch (error) {
    console.log("error creating jobs", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}



export async function GET(req: Request) {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        postedAt: "desc",
      },
    });
    return NextResponse.json(jobs);
  } catch (error) {
    console.log("error creating jobs", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
