import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqUser = await request.json();
  const { id, pw, email } = reqUser;

  // 기본적인 유효성 검사
  if (!id || !pw || !email) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  const newUser = {
    userId: id,
    password: pw,
    email: email,
    point: 0,
    createdAt: new Date(),
    updatedAt: undefined,
    deletedAt: undefined,
  };

  try {
    const createUser = await prisma.user.create({ data: newUser });
    return NextResponse.json(createUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 },
    );
  }

  try {
    const deleteUser = await prisma.user.update({
      data: { deletedAt: new Date() },
      where: { id: Number(id) },
    });
    return NextResponse.json(deleteUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
