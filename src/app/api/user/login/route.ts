import { getPrismaClient } from "@/utils/util";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const { prisma } = getPrismaClient();

export async function POST(request: NextRequest) {
  const SECRET_KEY = process.env.TOKEN_SECRET_KEY;

  // SECRET_KEY가 정의되지 않았을 경우 오류 반환
  if (!SECRET_KEY) {
    const response = NextResponse.json(
      { message: "Internal server error: SECRET_KEY is not defined" },
      { status: 500 },
    );
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
  }

  const reqUser = await request.json();
  const { id, pw } = reqUser;

  console.log(id, pw);

  try {
    const findUser = await prisma.user.findMany({
      where: {
        userId: id,
        password: pw,
      },
    });

    if (findUser.length === 0) {
      const response = NextResponse.json({
        message: "아이디 또는 비밀번호가 일치하지 않습니다.",
        status: 400,
      });
      response.headers.set("Access-Control-Allow-Origin", "*");
      return response;
    }

    if (findUser[0].deletedAt) {
      const response = NextResponse.json({
        message: "탈퇴한 회원입니다.",
        status: 400,
      });
      response.headers.set("Access-Control-Allow-Origin", "*");
      return response;
    }

    const payload = {
      userId: id,
      userName: findUser[0].userId,
    };
    const option = {
      expiresIn: "1h",
    };

    const token = jwt.sign(payload, SECRET_KEY, option);
    console.log(token);

    const response = NextResponse.json({
      data: { token, userInfo: findUser[0] },
      status: 200,
    });
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
  } catch (error) {
    console.error("Error processing request:", error);
    const response = NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
  }
}
