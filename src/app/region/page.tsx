import Divider from "@/components/common/Divider";
import RegionBox from "@/components/region/RegionBox";
import React from "react";

export default function RegionPage() {
  const REGION_1 = [
    {
      name: "서울특별시",
      name2: "",
      engName: "seoul",
      img: "/images/region/서울특별시.jpg",
      img2: "",
    },
    {
      name: "인천광역시",
      name2: "",
      engName: "incheon",
      img: "/images/region/인천광역시.jpg",
      img2: "",
    },
    {
      name: "경기도",
      name2: "",
      engName: "gyeonggi",
      img: "/images/region/경기도.jpg",
      img2: "",
    },
    {
      name: "강원특별자치도",
      name2: "",
      engName: "gangwon",
      img: "/images/region/강원특별자치도.jpg",
      img2: "",
    },
  ];

  const REGION_2 = [
    {
      name: "충청도",
      name2: "",
      engName: "chungcheong",
      img: "/images/region/충남.jpg",
      img2: "/images/region/충북.jpg",
    },
    {
      name: "경상도",
      name2: "",
      engName: "gyeongsang",
      img: "/images/region/경남.jpg",
      img2: "/images/region/경북.jpg",
    },
    {
      name: "부산,대구",
      name2: "",
      engName: "busan",
      img: "/images/region/부산.jpg",
      img2: "/images/region/대구.jpg",
    },
    {
      name: "전라도",
      name2: "",
      engName: "jeolla",
      img: "/images/region/전남.jpg",
      img2: "/images/region/전북.jpg",
    },
  ];
  return (
    <div className="w-full min-w-[1920px] flex flex-col items-start">
      <Divider />
      <div className="mt-[45px] mx-auto">
        <h2 className="font-bold text-[27px] ml-[145px]">
          가고싶은 지역을 선택해주세요
        </h2>
        <div className="flex items-center gap-[28px] px-[30px] mt-[59px]">
          <div className="w-[500px] h-[500px] bg-black rounded-[9px]">
            <img src="/images/koreamap.svg" alt="지도" />
          </div>
          <div className="flex flex-col gap-[51px]">
            <div className="flex items-center gap-[50px]">
              {REGION_1.map((region, index) => (
                <RegionBox
                  key={index}
                  name={region.name}
                  name2={region.name2}
                  img={region.img}
                  img2={region.img2}
                  engName={region.engName}
                />
              ))}
            </div>
            <div className="flex items-center gap-[50px]">
              {REGION_2.map((region, index) => (
                <RegionBox
                  key={index}
                  name={region.name}
                  name2={region.name2}
                  img={region.img}
                  img2={region.img2}
                  engName={region.engName}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
