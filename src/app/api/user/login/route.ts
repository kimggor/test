import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validateJwtToken } from "@/utils/util";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const SECRET_KEY = process.env.TOKEN_SECRET_KEY;

  if (!SECRET_KEY) {
    return NextResponse.json(
      { message: "Internal server error: SECRET_KEY is not defined" },
      { status: 500 },
    );
  }

  const reqUser = await request.json();
  const { id, pw } = reqUser;

  try {
    const findUser = await prisma.user.findMany({
      where: {
        userId: id,
        password: pw,
      },
    });

    if (findUser.length === 0) {
      return NextResponse.json(
        { message: "아이디 또는 비밀번호가 일치하지 않습니다." },
        { status: 400 },
      );
    }

    if (findUser[0].deletedAt) {
      return NextResponse.json(
        { message: "탈퇴한 회원입니다." },
        { status: 400 },
      );
    }

    const payload = {
      userId: id,
      userName: findUser[0].userId,
    };
    const option = {
      expiresIn: "1h",
    };

    const token = jwt.sign(payload, SECRET_KEY, option);

    return NextResponse.json(
      { data: { token, userInfo: findUser[0] } },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing request:", error);
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
