import { getPrismaClient } from "@/utils/util";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { prisma } = getPrismaClient();
  try {
    const findMovies = await prisma.movie.findMany();

    return findMovies && NextResponse.json(findMovies);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
