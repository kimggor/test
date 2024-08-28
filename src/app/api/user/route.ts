import { getPrismaClient } from "@/utils/util";
import { NextRequest, NextResponse } from "next/server";

const prisma = getPrismaClient().prisma;

export async function POST(request: NextRequest) {
  const reqUser = await request.json();
  const { id, pw, email } = reqUser;

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
