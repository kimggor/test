import { getPrismaClient } from "@/utils/util";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqUser = await request.json();
  const { id, pw, email } = reqUser;
  const newUser = {
    userId: id as string,
    password: pw as string,
    email: email as string,
    point: 0,
    createdAt: new Date(),
    updatedAt: undefined,
    deletedAt: undefined,
  };

  try {
    const { prisma } = getPrismaClient();
    const createUser = await prisma.user.create({ data: newUser });

    return NextResponse.json(createUser, { status: 201 }); // 명시적으로 201 상태 반환
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  console.log("test");
  const { id } = await request.json();
  console.log(id);

  try {
    const { prisma } = getPrismaClient();
    const deleteUser = await prisma.user.update({
      data: { deletedAt: new Date() },
      where: { id: Number(id) },
    });

    return NextResponse.json(deleteUser, { status: 200 }); // 명시적으로 200 상태 반환
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
