import { prisma } from "../../../../../libs/prisma";
import { auth } from "../../../../../auth";
import { NextResponse } from "next/server";
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ message: "Please login to edit a job!"}, {status : 401});
  }
  if (session.user.role !== "ADMIN") {
    return NextResponse.json({message : 'Forbidden'}, {status : 403})
  }
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, type, company, salary, location, description } = body;
    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        title,
        type,
        company,
        salary,
        location,
        description,
      },
    });
    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    console.log("error creating jobs", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const jobDetail = await prisma.job.findUnique({ where: { id } });
    return NextResponse.json(jobDetail, { status: 200 });
  } catch (error) {
    console.log("error creating jobs", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
