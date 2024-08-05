'use client';
import { selectPlaceState } from '@/atom/selectPlaceStore';
import Divider from '@/components/common/Divider';
import KakaoMap from '@/components/movie/KakaoMap';
import KakaoMap2 from '@/components/movie/KakaoMap2';
import RouteCard from '@/components/mypage/RouteCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function TotalRoutePage() {
    const [userSaveRoute, setUserSaveRoute] = useState<any[]>([]);
    const [location, setLocation] = useState<string[]>([]);

    useEffect(() => {
        if (!localStorage.getItem('id')) return;
        axios
            .get(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/content/submit`, {
                params: { userId: localStorage.getItem('id') },
            })
            .then((res) => {
                setUserSaveRoute(res.data.userSaveRoute);
                res.data.userSaveRoute.map((route: any) => {
                    const parseData = JSON.parse(route.selectRoute);
                    const locationData = parseData[0].location;
                    setLocation((prev) => [...prev, locationData]);
                });
            });
    }, []);
    console.log(location);

    console.log(userSaveRoute);

    return location.length !== 0 ? (
        <div className="w-full min-w-[1920px] flex flex-col items-center">
            <Divider />
            <div className="w-full relative">
                <KakaoMap2 place={[...new Set(location)]} />
            </div>
            <div className="w-full flex flex-col gap-[86px] justify-center items-center mt-[86px]">
                {userSaveRoute.length === 0 ? (
                    <p className="text-[18px]">저장된 경로가 없습니다.</p>
                ) : (
                    userSaveRoute.map((route: any, i) => {
                        return (
                            <div className="w-[1000px] h-[183px] relative" key={route.content}>
                                <div>
                                    <RouteCard
                                        userSaveRouteId={route.userSaveRouteId}
                                        type={route.contentType}
                                        title={route.content}
                                        progress={route.progress}
                                        key={i}
                                    />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    ) : (
        <div className="w-full min-w-[1920px] flex flex-col items-center">
            <p className="text-[18px]">저장된 경로가 없습니다.</p>
        </div>
    );
}
