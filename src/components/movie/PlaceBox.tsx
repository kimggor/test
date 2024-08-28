import { CommonPlaceDataType, MoviePlaceDataType } from "@/type/movieType";
import React, { useEffect } from "react";
import CheckBackground from "../common/CheckBackground";
import { useRecoilValue } from "recoil";
import { selectPlaceState } from "@/atom/selectPlaceStore";

type PlaceBoxType = {
  movie: MoviePlaceDataType;
  handleClick?: (movie: MoviePlaceDataType) => void;
};

export default function PlaceBox({
  movie,
  handleClick = () => {},
}: PlaceBoxType) {
  // 장소 컴포넌트
  const selectedPlace = useRecoilValue(selectPlaceState);

  return (
    <div
      key={movie.moviePlaceId}
      className="w-full sm:w-[240px] md:w-[280px] lg:w-[340px] h-[180px] sm:h-[200px] md:h-[220px] flex flex-col items-center"
    >
      <div
        className="w-full h-[80%] rounded-lg cursor-pointer relative"
        onClick={() => handleClick(movie)}
      >
        <img
          src={`/images/place/${movie.title}/${movie.placeName}.png`}
          alt="장소 이미지"
          className="w-full h-full rounded-lg object-cover"
        />
        {selectedPlace.find(
          (item) => item.moviePlaceId === movie.moviePlaceId,
        ) && <CheckBackground />}
      </div>
      <div className="w-[80%] sm:min-w-[60%] px-2 py-1 flex items-center justify-center bg-[#030303] rounded-full mt-1">
        <p className="text-sm sm:text-[16px] md:text-[18px] text-white text-center">
          {movie.placeName}
        </p>
      </div>
    </div>
  );
}
