import prisma from "@/utils/prisma"; // 이미 가져온 Prisma 클라이언트 인스턴스를 사용
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams.get("title");

  // 유효성 검사: params가 없을 경우 오류 반환
  if (!params) {
    return NextResponse.json(
      { message: "Title parameter is required" },
      { status: 400 },
    );
  }

  try {
    const findMovie = await prisma.movie.findMany({
      where: {
        title: params,
      },
    });

    const findMoviePlace = await prisma.moviePlace.findMany({
      where: {
        title: params,
      },
    });

    return NextResponse.json({ findMovie, findMoviePlace });
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
