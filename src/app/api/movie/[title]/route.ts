import { getPrismaClient } from "@/utils/util";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { prisma } = getPrismaClient();
  const params = request.nextUrl.searchParams.get("title");
  console.log(params)

  const findMovie = await prisma.movie.findMany({
    where: {
      title: params as string,
    },
  });
  try {
    const findMoviePlace = await prisma.moviePlace.findMany({
      where: {
        title: params as string,
      },
    });

    return (findMoviePlace && findMovie) && NextResponse.json({ findMovie, findMoviePlace });
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
