import React from "react";
import ReviewList from "./ReviewList";
import Divider from "../common/Divider";
import { MovieDataType } from "@/type/movieType";

export default function ReviewContainer({movieInfo}: {movieInfo: MovieDataType}) {

  // MovieInfo 컴포넌트에서 받아온 movieInfo를 props로 받아와서 사용
  return (
    <div className="w-full max-w-[1920px] flex flex-col justify-center mt-4">
      <div className="w-full flex px-16 py-3  gap-5">
        <div className="w-[200px] h-[250px]  flex items-center justify-center border-r border-[#c1c1c1]">
          <img
            className="min-w-[200px] h-full rounded-lg"
            src={`/images/poster/${movieInfo.title}.jpg`}
            alt="영화 포스터 이미지"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 text-[#030303] font-[700]">
            <p className="text-[24px]">{movieInfo.title}</p>
            <p>개봉일: {movieInfo.releaseDate}</p>
            <p>평점: {movieInfo.rating}</p>
            <p>
              {movieInfo.plot}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[21px]"></div>
      </div>
      <ReviewList movieTitle={movieInfo.title} />
    </div>
  );
}
