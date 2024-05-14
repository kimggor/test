'use client';
import { selectPlaceState } from '@/atom/selectPlaceStore';
import RadialBarChart from '@/components/chart/RadialBarChart';
import Divider from '@/components/common/Divider';
import Overlay from '@/components/common/Overlay';
import Popup from '@/components/common/Popup';
import KakaoMap from '@/components/movie/KakaoMap';
import RouteCard from '@/components/mypage/RouteCard';
import PlaceCard from '@/components/region/PlaceCard';
import useWatchLocation, { Location } from '@/hooks/useWatchLocation';
import { distance } from '@/utils/util';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function MyRoute() {
    const [userSaveRoute, setUserSaveRoute] = useState([]);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [selectTitle, setSelectTitle] = useState();
    const [contentType, setContentType] = useState();
    const [progress, setProgress] = useState<number>(0);
    const [isRecordStart, setIsRecordStart] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [location, setLocation] = useState<Location>();
    const [error, setError] = useState();

    const [selectPlace, setSelectPlace] = useRecoilState(selectPlaceState);
    const [userSaveRouteId, setUserSaveRouteId] = useState<number>();

    const [isDeletePopup, setIsDeletePopup] = useState(false);
    const handleOpenDeletePopup = (userSaveRouteId: number) => {
        setIsDeletePopup(true);
        setUserSaveRouteId(userSaveRouteId);
    };

    const handleDeleteRoute = () => {
        console.log('경로 삭제');
        axios
            .delete(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/content`, {
                params: {
                    userSaveRouteId,
                },
            })
            .then((res) => {
                setIsDeletePopup(false);
                handleDeleteTrigger();
            });
    };

    const handleDeleteTrigger = () => {
        setDeleteTrigger(!deleteTrigger);
    };

    const handleSelectRoute = (route: any) => {
        const { selectRoute } = route;
        setSelectPlace(JSON.parse(selectRoute));
        setSelectTitle(route.content);
        setContentType(route.contentType);
        setProgress(route.progress);
    };

    const handleSuccess = (pos: any) => {
        const { latitude, longitude } = pos.coords;

        setLocation({
            latitude,
            longitude,
        });
    };

    // Error handler for geolocation's `getCurrentPosition` method
    const handleError = (error: any) => {
        setError(error.message);
    };

    const handleCheckLocation = () => {
        const { geolocation } = navigator;
        geolocation.getCurrentPosition(handleSuccess, handleError, {});
    };

    // const { location, cancelLocationWatch, error } = useWatchLocation(isRecordStart);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setTrigger(!trigger);
    //     }, 5000);

    //     return () => {
    //         clearInterval(interval);
    //         cancelLocationWatch();
    //     };
    // }, []);

    useEffect(() => {
        if (selectPlace.length === 0 || !selectTitle || !location) return;
        let count = 0;
        selectPlace.map((route, index) => {
            // console.log(route)
            const { lat, lng } = route; //선택한 여행지 경로
            const { latitude, longitude } = location; //내 현재 위치

            // const isSuccess = distance(lat, lng, latitude, longitude, 10);
            const isSuccess = distance(lat, lng, 37.552846, 126.92133, 10);

            if (isSuccess) {
                setIsLoading(true);
                const updateData = {
                    userId: localStorage.getItem('id'),
                    content: decodeURIComponent(selectTitle),
                    route,
                };
                axios
                    .patch(
                        `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/content/${decodeURIComponent(selectTitle)}`,
                        updateData
                    )
                    .then((res) => {
                        if (res.data.code === 403) {
                            alert('이미 완료된 장소입니다.');
                            return;
                        }
                        setProgress(res.data.userProgressUpdateRes.progress);
                        setIsLoading(false);
                    });
            } else {
                count++;
            }
        });
        if (count === selectPlace.length) {
            alert('여행지 근처가 아닙니다.');
        }
    }, [location]);

    useEffect(() => {
        if (!localStorage.getItem('id')) return;
        axios
            .get(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/content`, {
                params: { userId: localStorage.getItem('id') },
            })
            .then((res) => {
                setUserSaveRoute(res.data.userSaveRoute);
            });
    }, [deleteTrigger]);

    return (
        <div className="w-full min-w-[1920px] flex flex-col items-center">
            <Divider />
            {selectTitle ? (
                <>
                    <div className="w-full relative">
                        <KakaoMap />
                        <div className="w-[240px] h-[240px] absolute right-[240px] top-[120px] z-[999]">
                            <RadialBarChart
                                isMap={true}
                                data={[{ id: 'chart', data: [{ x: 'progress', y: progress }] }]}
                            />
                            <p className="absolute text-[36px] font-semibold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                {progress}%
                            </p>
                        </div>
                    </div>
                    <div className="w-full mt-[70px]">
                        <Divider height="h-[1px]" />
                    </div>
                    <div className="w-full flex flex-col gap-[11px] pb-[36px] mt-5 items-center">
                        <div className=" px-[14px] py-[10px] border border-[#D0D5DD] rounded-[8px]">
                            <p className="text-[#667085] text-[24px] font-bold">
                                서울여행:{decodeURIComponent(selectTitle)}
                            </p>
                        </div>
                        <div className="w-full flex items-center justify-center gap-4">
                            {selectPlace?.map((placeName, index) => {
                                return (
                                    <>
                                        <PlaceCard
                                            region={selectTitle}
                                            placeName={placeName.placeName}
                                            isPlace={contentType === '지역' ? false : true}
                                        />
                                        {index !== selectPlace.length - 1 && (
                                            <img className="w-[48px] h-[48px]" src="/images/placeArrow.svg" alt="" />
                                        )}
                                    </>
                                );
                            })}
                        </div>
                        {progress !== 100 && (
                            <div className="w-full flex items-center justify-center gap-[178px]">
                                <button
                                    onClick={handleCheckLocation}
                                    className="px-6 py-4 rounded-[6px] bg-[#2D3648] text-white text-[24px] font-bold mt-[70px]"
                                >
                                    기록시작
                                </button>
                                <button
                                    onClick={() => setIsRecordStart(false)}
                                    className="px-6 py-4 rounded-[6px] bg-[#2D3648] text-white text-[24px] font-bold mt-[70px]"
                                >
                                    기록종료
                                </button>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-[36px] mt-[56px]">경로를 선택하세요!</h1>
                    <div className="w-full flex flex-col gap-[86px] justify-center items-center mt-[86px]">
                        {userSaveRoute.length === 0 ? (
                            <p className="text-[18px]">저장된 경로가 없습니다.</p>
                        ) : (
                            userSaveRoute.map((route: any, i) => {
                                return (
                                    <div className="w-[1000px] h-[183px] relative" key={route.content}>
                                        <div onClick={() => handleSelectRoute(route)}>
                                            <RouteCard
                                                userSaveRouteId={route.userSaveRouteId}
                                                type={route.contentType}
                                                title={route.content}
                                                progress={route.progress}
                                                handleDeleteTrigger={handleDeleteTrigger}
                                                key={i}
                                            />
                                        </div>
                                        <button
                                            onClick={() => handleOpenDeletePopup(route.userSaveRouteId)}
                                            className="px-[18px] py-[8px] text-white bg-[#2D3648] rounded-[6px] absolute right-0 -bottom-[40px]"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                );
                            })
                        )}
                        {isDeletePopup && (
                            <Overlay>
                                <Popup
                                    title="삭제"
                                    desc="정말 삭제하시겠습니까?"
                                    onClick={handleDeleteRoute}
                                    closePopup={() => setIsDeletePopup(false)}
                                />
                            </Overlay>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
