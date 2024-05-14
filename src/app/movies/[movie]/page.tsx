'use client';
import { selectPlaceState } from '@/atom/selectPlaceStore';
import Divider from '@/components/common/Divider';
import KakaoMap from '@/components/movie/KakaoMap';
import MovieDetails from '@/components/movie/MovieDetails';
import PlaceBox from '@/components/movie/PlaceBox';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

export default function MovieDetailPage({ params }: { params: { movie: string | number } }) {
    const [isSelected, setIsSelected] = useState(false);
    const [selectedPlace, setSelectPlace] = useRecoilState(selectPlaceState);
    const [progress, setProgress] = useState<number>(0);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    const getMovieType = (movie: string) => {
        if (movie === '1987' || movie === '리틀포레스트' || movie === '태극기 휘날리며') {
            return '영화';
        } else {
            return '드라마';
        }
    };

    const handleSelect = (validateMoviePlace: boolean) => {
        validateMoviePlace && setIsSelected(true);
    };

    const handleUnSelect = () => {
        setIsSelected(false);
    };

    const handleRouteSave = () => {
        const successRouteDatas = selectedPlace.map((place) => {
            return {
                place: place.placeName,
                isSuccess: false,
            };
        });
        console.log(successRouteDatas);
        const userProgressCreateDatas = {
            userId: Number(localStorage.getItem('id')),
            content: decodeURIComponent(String(params.movie)),
            selectRoute: JSON.stringify(selectedPlace),
            successRoute: JSON.stringify(successRouteDatas),
            contentType: getMovieType(decodeURIComponent(String(params.movie))),
            progress,
        };
        // 경로 저장
        if (userProgressCreateDatas) {
            axios
                .post(
                    `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/content/${decodeURIComponent(String(params.movie))}`,
                    userProgressCreateDatas
                )
                .then((res) => {
                    if (res.data.code === 403) {
                        alert('이미 저장된 콘텐츠입니다.');
                        return;
                    } else {
                        setIsPopupOpen(true);
                        console.log('경로 저장 완료');
                    }
                });
        }
    };

    // 페이지 벗어날 때 선택한 장소 초기화
    useEffect(() => {
        return () => {
            setSelectPlace([]);
        };
    }, []);

    return !isSelected ? (
        <MovieDetails movie={params.movie as string} handleSelect={handleSelect} />
    ) : (
        <div className="w-full h-full min-w-[1920px]">
            <Divider />
            <div className="w-full flex items-center justify-between py-10 px-16">
                <div className="flex items-center gap-5">
                    <div onClick={handleUnSelect} className="cursor-pointer">
                        <img src="/images/return.svg" alt="돌아가기 아이콘" className="w-10 h-10" />
                    </div>
                    <h2 className="text-[#333333] text-[32px] font-[700]">선택한 촬영지 기반으로 경로를 안내할게요!</h2>
                </div>
                <div className="w-[282px] h-[52px] flex items-center justify-between p-2 bg-black rounded-lg">
                    <p className="text-[#f2f2f2] text-[24px]">{decodeURIComponent(params.movie as string)}</p>
                    <img src="/images/Search.png" alt="검색 아이콘" className="w-[40px] h-[40px]" />
                </div>
            </div>
            <div className="w-full flex flex-col items-center">
                <KakaoMap />
                <div className="w-full max-w-[1920px] flex flex-col items-start mt-5">
                    <h2 className="text-[32px] text-[#333333] font-[700] mb-2">선택한 촬영지</h2>
                    <Divider height="h-[8px]" />
                    <div className="w-full max-w-[1920px] grid grid-cols-5 gap-4 px-16 py-8">
                        {selectedPlace?.map((movie) => (
                            <PlaceBox key={movie.moviePlaceId} movie={movie} />
                        ))}
                    </div>
                </div>
                <button
                    onClick={handleRouteSave}
                    className="px-6 py-4 rounded-[6px] bg-[#2D3648] text-white text-[24px] font-bold mt-[70px] mb-[36px]"
                >
                    경로저장
                </button>
            </div>
            {isPopupOpen && (
                <div className="w-[546px] h-[156px] p-6 flex flex-col gap-2 bg-white rounded-[8px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                    <p>경로저장 완료!</p>
                    <p>마이페이지에서 확인가능해요</p>
                    <div onClick={() => setIsPopupOpen(false)} className="absolute right-[10px] top-[10px]">
                        <img src="/images/popupClose.svg" alt="" />
                    </div>
                </div>
            )}
        </div>
    );
}
