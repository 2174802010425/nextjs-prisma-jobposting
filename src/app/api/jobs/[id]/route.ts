import { prisma } from "../../../../../libs/prisma";
import { auth } from "../../../../../auth";
import { NextResponse } from "next/server";

// update job
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

// Get job detail
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

// delete job
export async function DELETE(req : Request, {params} : {params : Promise<{id : string}>}) {
  const session = await auth()
  if (!session || !session.user) {
    return NextResponse.json('Unauthorized', {status : 401})
  }
  if (session.user.role !== 'ADMIN') {
    return NextResponse.json("Forbidden", {status : 403})
  }
  try {
    const {id} = await params
    if (!id) {
      return NextResponse.json('Can not find relative job', {status : 404})
    }
    await prisma.job.delete({
      where : {id}
    })
    return NextResponse.json('Delete job successfully', {status : 200})
  } catch (error) {
    console.log("error creating jobs", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}