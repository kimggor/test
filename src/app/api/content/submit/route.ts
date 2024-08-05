import { getPrismaClient } from "@/utils/util";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { prisma } = getPrismaClient();
    const userId = request.nextUrl.searchParams.get("userId");
    try {
      const userSaveRoute = await prisma.userSaveRoute.findMany({
        where: {
          userId: Number(userId),
          contentType: '지역',
          progress: 100,
        },
      });
  
      return (userSaveRoute ) && NextResponse.json({ userSaveRoute });
    } catch (error) {
      console.error(error);
      NextResponse.json({ message: "Internal server error" });
    }
  }