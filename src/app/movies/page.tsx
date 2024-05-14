"use client";
import Divider from "@/components/common/Divider";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { MovieDataType, MoviePlaceDataType } from "@/type/movieType";

export default function MainPage() {
  const [movies, setMovies] = useState<MovieDataType[]>([]);

  // 영화 정보 가져오기
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/movie`).then((res) => {

      setMovies(res.data);
    });
  }, []);

  return (
    <div className="w-full h-full min-w-[1920px] flex flex-col items-center">
      <Divider />
      <div className="w-full max-w-[1920px] flex flex-col items-center px-40 py-8">
        <div className="w-full flex items-center justify-between py-4">
          <h2 className="font-[600] text-[24px]">
            여행에 담고 싶은 컨텐츠를 선택하세요
          </h2>
        </div>
        <div className="w-full grid grid-cols-5 gap-y-6">
          {movies.map((movie, i) => {
            return (
              <Link
                key={movie.movieId}
                href={`/movies/${movie.title}`}
                className="flex flex-col items-start"
              >
                <div key={i} className="w-[250px] h-[320px] rounded-lg">
                  <img
                    className="w-full h-full rounded-[inherit]"
                    src={`/images/poster/${movie.title}.jpg`}
                    alt="로고 이미지"
                  />
                </div>
                <p>{movie.title}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
