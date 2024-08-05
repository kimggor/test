import React, { useEffect, useState } from "react";
import placeData from "../../../public/서울행정구역.json"; // JSON 데이터 import
import axios from "axios";
import Script from "next/script";

export default function KakaoMap2({ place }: { place: string[] }) {
  console.log(place);
  const API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
  const [map, setMap] = useState<any>();
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    place.forEach((p) => {
      const findData = placeData.features.find(
        (pl) => pl.properties.name === p,
      );
      if (findData) {
        setPlaces((prev) => [...prev, findData]);
      }
    });
  }, [place]); // place를 의존성 배열로 설정

  const loadKakaoMap = () => {
    if (places.length === 0) return;

    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(
          37.557533180704915,
          127.11519584981606,
        ),
        level: 7,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(map);
      console.log(places);
      places.forEach((p) => {
        const polygonPath = p.geometry.coordinates[0].map(
          (coor: number[]) => new window.kakao.maps.LatLng(coor[1], coor[0]),
        );
        if (polygonPath.length !== 0) {
          const polygon = new window.kakao.maps.Polygon({
            path: polygonPath,
            strokeColor: "#925CE9",
            fillColor: "#925CE9",
            fillOpacity: 0.2,
          });
          polygon.setMap(map);
        }
      });
    });
  };

  useEffect(() => {
    loadKakaoMap(); // places가 업데이트될 때마다 loadKakaoMap 호출
  }, [places]);

  console.log(places);
  return (
    places.length !== 0 && (
      <div className="w-full h-auto flex flex-col gap-2 items-center mt-[40px]">
        <img
          src="/images/kakaoMap.png"
          alt="카카오맵 로고"
          width={120}
          height={120}
          className="rounded-lg cursor-pointer"
        />
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&autoload=false`}
          onReady={loadKakaoMap}
          onError={console.error}
        />
        <div id={"map"} className="w-4/5 h-[800px]" />
      </div>
    )
  );
}
