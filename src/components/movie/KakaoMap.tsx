"use client";
import { selectPlaceState } from "@/atom/selectPlaceStore";
import axios from "axios";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import PlaceBox from "./PlaceBox";
import Divider from "../common/Divider";

declare global {
  interface Window {
    kakao: any;
  }
}

type WaypointType = {
  name: string;
  x: number;
  y: number;
};

type Props = {
  handleSetMap: (map: any) => void;
};

// 경로 위도, 경도 상태 저장
// 초기 위치는 출발 지점
// 선택한 장소 상태 관리는 ??
export default function KakaoMap() {
  const API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const [map, setMap] = useState<any>();
  const [selectedPlace, setSelectedPlace] = useRecoilState(selectPlaceState);
  const DEFAULT_LAT =
    selectedPlace.length !== 0 && String(selectedPlace[0].lat);
  const DEFAULT_LNG =
    selectedPlace.length !== 0 && String(selectedPlace[0].lng);
  const [linePaths, setLinePaths] = useState<any[]>([]);
  const spotList = selectedPlace.slice(1, selectedPlace.length);

  const handleMarkers = (lat: any, lng: any, start: boolean, last: boolean) => {
    const markerImage = new window.kakao.maps.MarkerImage(
      `/images/${last ? "endLoad" : start ? "startLoad" : "spotLoad"}.png`,
      new window.kakao.maps.Size(50, 50)
    );
    const markerPosition = new window.kakao.maps.LatLng(lat, lng);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    // 지도에 마커 표시
    marker.setMap(map);
  };

  const handleSetLoad = () => {
    if (map && linePaths.length > 0) {
      selectedPlace.map((wayPoint, i) => {
        handleMarkers(
          wayPoint.lat,
          wayPoint.lng,
          i === 0,
          i === selectedPlace.length - 1
        );
      });
      // 지도에 표시할 선을 생성합니다
      const outline = new window.kakao.maps.Polyline({
        map: map, // 지도에 선을 표시합니다
        path: linePaths, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 13, // 선의 두께 입니다
        strokeColor: "black", // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "solid", // 선의 스타일입니다
      });

      const line = new window.kakao.maps.Polyline({
        map: map, // 지도에 선을 표시합니다
        path: linePaths, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 10, // 선의 두께 입니다
        strokeColor: "blue", // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "solid", // 선의 스타일입니다
      });

      const dash = new window.kakao.maps.Polyline({
        map: map, // 지도에 선을 표시합니다
        path: linePaths, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 2, // 선의 두께 입니다
        strokeColor: "#fff", // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "dash", // 선의 스타일입니다
        zIndex: 1,
      });
      // 지도에 선을 표시합니다
      //   polyline.setMap(map);
      outline.setMap(map);
      line.setMap(map);
      dash.setMap(map);
    }
  };

  // 카카오맵 로드
  const loadKakaoMap = () => {
    if (selectedPlace.length === 0) return;
    window.kakao.maps.load(() => {
      axios
        .post(
          `https://apis-navi.kakaomobility.com/v1/waypoints/directions`,
          postData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `KakaoAK ${REST_API_KEY}`,
            },
          }
        )
        .then((res) => {
          if (res.data.routes[0].result_code === 107) {
            alert(res.data.routes[0].result_msg);
            return;
          }
          setLinePaths((prev) => [
            ...prev,
            new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
          ]);
          res.data.routes[0]?.sections?.forEach((section: any) => {
            section.roads.map((road: any) => {
              setLinePaths((prev) => [
                ...prev,
                new window.kakao.maps.LatLng(
                  road.vertexes[1],
                  road.vertexes[0]
                ),
              ]);
              setLinePaths((prev) => [
                ...prev,
                new window.kakao.maps.LatLng(
                  road.vertexes[3],
                  road.vertexes[2]
                ),
              ]);
            });
          });
        })
        .then(() => {
          const mapContainer = document.getElementById("map");
          const mapOption = {
            center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
            level: 3,
          };
          const map = new window.kakao.maps.Map(mapContainer, mapOption);
          setMap(map);
        });
    });
  };

  const postData = {
    // 출발지
    origin: {
      x: DEFAULT_LNG,
      y: DEFAULT_LAT,
    },

    // 도착지
    destination: {
      x:
        selectedPlace.length !== 0 &&
        Number(selectedPlace[selectedPlace.length - 1].lng),
      y:
        selectedPlace.length !== 0 &&
        Number(selectedPlace[selectedPlace.length - 1].lat),
    },

    // 경유지
    waypoints: spotList.map((item) => {
      return {
        name: item.placeName,
        x: item.lng,
        y: item.lat,
      };
    }),
    priority: "RECOMMEND",
    car_fuel: "GASOLINE",
    car_hipass: false,
    alternatives: false,
    road_details: true,
  };

  return (
    selectedPlace.length !== 0 &&
    linePaths && (
      <div className="w-full h-auto flex flex-col gap-2 items-center mt-[40px]">
        <img
          src="/images/kakaoMap.png"
          alt="카카오맵 로고"
          width={120}
          height={120}
          className="rounded-lg cursor-pointer"
          onClick={handleSetLoad}
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
