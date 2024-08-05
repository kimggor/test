"use client";
import { selectPlaceState } from "@/atom/selectPlaceStore";
import Divider from "@/components/common/Divider";
import KakaoMap from "@/components/movie/KakaoMap";
import PlaceCard from "@/components/region/PlaceCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function PlaceMapPage({
  params: { place },
}: {
  params: { place: string };
}) {
  const [contentPlace, setContentPlace] = useRecoilState(selectPlaceState);
  const [progress, setProgress] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  // 페이지 벗어날 때 선택한 장소 초기화
  const handleRouteSave = () => {
    const successRouteDatas = contentPlace.map((place) => {
      return {
        place: place.placeName,
        isSuccess: false,
      };
    });

    const userProgressCreateData = {
      userId: Number(localStorage.getItem("id")),
      content: decodeURIComponent(place),
      selectRoute: JSON.stringify(contentPlace),
      successRoute: JSON.stringify(successRouteDatas),
      contentType: "지역",
      progress,
    };
    // 경로 저장
    axios
      .post(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/content/${decodeURIComponent(
          place
        )}`,
        userProgressCreateData
      )
      .then((res) => {
        setIsPopupOpen(true);
        console.log(res.data);
        console.log("경로 저장 완료");
      });
  };

  useEffect(() => {
    if (!place) return;
    axios
      .get(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/content/${decodeURIComponent(
          place
        )}`,
        {
          params: { category: decodeURIComponent(place) },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 403) {
          alert("이미 저장된 콘텐츠입니다.");
          return;
        } else {
          console.log(res.data.findContentPlace);
          setContentPlace(res.data.findContentPlace);
        }
      });
    return () => {
      setContentPlace([]);
    };
  }, []);

  return (
    <>
      <div className="w-full h-full min-w-[1920px] flex flex-col items-center">
        <Divider />
        <h1 className="text-[25px]">{decodeURIComponent(place)} 추천 경로</h1>
        <KakaoMap />
        <div className="w-full mt-[70px]">
          <Divider height="h-[1px]" />
        </div>
        <div className="w-full flex flex-col gap-[11px] pb-[36px] mt-5 items-center">
          <div className=" px-[14px] py-[10px] border border-[#D0D5DD] rounded-[8px]">
            <p className="text-[#667085] text-[24px] font-bold">
              여행지:{decodeURIComponent(place)}
            </p>
          </div>
          <div className="w-full flex items-center justify-center gap-4">
            {contentPlace?.map((placeName, index) => {
              console.log(placeName.placeName);
              return (
                <>
                  <PlaceCard
                    region={decodeURIComponent(place)}
                    placeName={placeName.placeName}
                  />
                  {index !== contentPlace.length - 1 && (
                    <img
                      className="w-[48px] h-[48px]"
                      src="/images/placeArrow.svg"
                      alt=""
                    />
                  )}
                </>
              );
            })}
          </div>
          <button
            onClick={handleRouteSave}
            className="px-6 py-4 rounded-[6px] bg-[#2D3648] text-white text-[24px] font-bold mt-[70px]"
          >
            경로저장
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <div className="w-[546px] h-[156px] p-6 flex flex-col gap-2 bg-white rounded-[8px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <p>경로저장 완료!</p>
          <p>마이페이지에서 확인가능해요</p>
          <div
            onClick={() => setIsPopupOpen(false)}
            className="absolute right-[10px] top-[10px]"
          >
            <img src="/images/popupClose.svg" alt="" />
          </div>
        </div>
      )}
    </>
  );
}
