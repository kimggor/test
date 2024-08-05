"use client";
import Divider from "@/components/common/Divider";
import useWatchLocation from "@/hooks/useWatchLocation";
import Link from "next/link";
import React from "react";

export default function Choice() {
  return (
    <div className="w-full h-full flex flex-col items-center min-w-[320px] lg:min-w-[1920px]">
      <Divider />
      <div className="w-full flex flex-col items-center justify-center mt-6 lg:mt-[45px] lg:flex-row lg:gap-[305px]">
        <Link
          href={"movies"}
          className="flex flex-col items-center gap-4 lg:gap-10 cursor-pointer mb-6 lg:mb-0"
        >
          <h2 className="text-base font-bold lg:text-lg">
            콘텐츠를 직접 선택 후 경로 만들고 여행가기
          </h2>
          <img
            src="/images/content.jpg"
            alt="content"
            className="w-48 h-48 lg:w-auto lg:h-auto"
          />
        </Link>
        <Link
          href={"region"}
          className="flex flex-col items-center gap-4 lg:gap-10 cursor-pointer"
        >
          <h2 className="text-base font-bold lg:text-lg">
            콘텐츠를 직접 선택 후 경로 만들고 여행가기
          </h2>
          <img
            src="/images/region.jpg"
            alt="region"
            className="w-48 h-48 lg:w-auto lg:h-auto"
          />
        </Link>
      </div>
    </div>
  );
}
