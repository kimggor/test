import { CommonPlaceDataType, MoviePlaceDataType } from "@/type/movieType";
import React, { useEffect } from "react";
import CheckBackground from "../common/CheckBackground";
import { useRecoilValue } from "recoil";
import { selectPlaceState } from "@/atom/selectPlaceStore";

type PlaceBoxType = {
  movie: MoviePlaceDataType;
  handleClick?: (movie: MoviePlaceDataType ) => void;
};

export default function PlaceBox({
  movie,
  handleClick=() => {},
}: PlaceBoxType) {

  // 장소 컴포넌트
  const selectedPlace = useRecoilValue(selectPlaceState);

  return (
    <div
      key={movie.moviePlaceId}
      className="w-[340px] h-[220px] flex flex-col items-center"
    >
      <div
        className="w-full h-[85%] rounded-lg cursor-pointer relative"
        onClick={() => handleClick(movie)}
      >
        <img
          src={`/images/place/${movie.title}/${movie.placeName}.png`}
          alt="장소 이미지"
          className="w-full h-full rounded-lg"
        />
        {selectedPlace.find((item) => item.moviePlaceId === movie.moviePlaceId) && <CheckBackground />}
      </div>
      <div className="min-w-[60%] px-2 py-1 flex items-center justify-center bg-[#030303] rounded-full mt-[2px]">
        <p className="text-[18px] text-white">{movie.placeName}</p>
      </div>
    </div>
  );
}
 