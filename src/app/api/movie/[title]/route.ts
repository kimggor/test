import { getPrismaClient } from "@/utils/util";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { prisma } = getPrismaClient();
  const params = request.nextUrl.searchParams.get("title");

  // params 값이 null인지 확인
  if (!params) {
    return NextResponse.json(
      { message: "Title parameter is required" },
      { status: 400 },
    );
  }

  try {
    const findMovie = await prisma.movie.findMany({
      where: {
        title: params as string,
      },
    });

    const findMoviePlace = await prisma.moviePlace.findMany({
      where: {
        title: params as string,
      },
    });

    // 결과를 반환
    return NextResponse.json({ findMovie, findMoviePlace });
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
