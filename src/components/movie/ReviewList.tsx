import React, { useEffect, useState } from "react";
import ReviewBox from "./ReviewBox";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "@/atom/userStore";
import ReviewPostArea from "./ReviewPostArea";

export default function ReviewList({ movieTitle }: { movieTitle: string }) {
  const [starRating, setStarRating] = useState(0);
  const [reviewList, setReviewList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useRecoilValue(userState);

  const arr = new Array(5).fill(0);

  const handleStart = (index: number) => {
    if (index + 1 === starRating) {
      setStarRating(0);
    } else {
      setStarRating(index + 1);
    }
  };

  const handleStarInitial = () => {
    setStarRating(0);
  };

  const getMovieReview = () => {
    axios
      .get(
        `${
          process.env.NEXT_PUBLIC_LOCAL_URL
        }/api/review?movieTitle=${decodeURIComponent(movieTitle)}`
      )
      .then((res) => {
        setReviewList(res.data.data);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    getMovieReview();
  }, [movieTitle]);

  return (
    <div className="w-full flex flex-col gap-3 px-16 mt-8">
      <div className="flex items-end justify-between">
        <h2 className="text-[24px] text-[#333333] font-[700]">
          무비트립 사용자 평
        </h2>
        <div className="flex gap-2 items-center">
          <p className="text-[24px]">평가하기 {">"} </p>
          <div className="flex gap-2 items-center">
            {arr.map((item, i) => (
              <span
                key={i}
                className={i < starRating ? "text-[#ffc107]" : "text-[#c1c1c1]"}
                onClick={() => handleStart(i)}
              >
                {i < starRating ? (
                  <img
                    src="/images/activeStar.png"
                    alt="별점 이미지"
                    className="w-6 h-6 cursor-pointer"
                  />
                ) : (
                  <img
                    src="/images/defaultStar.png"
                    alt="별점 이미지"
                    className="w-6 h-6 cursor-pointer"
                  />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
      <ReviewPostArea
        movieTitle={movieTitle}
        starRating={starRating}
        handleStarInitial={handleStarInitial}
        getMovieReview={getMovieReview}
      />
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <p>로딩중입니다...</p>
        ) : (
          reviewList.map((item, i) => <ReviewBox review={item} key={i} />)
        )}
      </div>
    </div>
  );
}
