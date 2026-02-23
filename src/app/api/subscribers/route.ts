import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../libs/prisma";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  try {
    if (!email) {
      return NextResponse.json("Email is required", { status: 400 });
    }
    const newSubcriber = await prisma.subscriber.create({
      data: {
        email,
      },
    });
  } catch (error) {}
}
