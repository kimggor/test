import React, { useState } from 'react';
import RadialBarChart from '../chart/RadialBarChart';
import Popup from '../common/Popup';
import Overlay from '../common/Overlay';
import axios from 'axios';

type RouteCardProps = {
    userSaveRouteId: number;
    type: string;
    title: string;
    progress: number;
    handleDeleteTrigger: () => void;
};

export default function RouteCard({userSaveRouteId, type, title, progress, handleDeleteTrigger }: RouteCardProps) {

    return (
        <>
            <div className="w-[1000px] h-[183px] relative">
                <div className="w-full h-full rounded-[20px] flex items-center relative border-1 border-black shadow-xl cursor-pointer">
                    <img
                        className="w-[225px] h-full rounded-l-[20px]"
                        src={type === '지역' ? `/images/content/place/${title}.jpg` : `/images/poster/${title}.jpg`}
                        alt=""
                    />
                    <div className="flex-1 flex items-center px-[31px] py-[51px]">
                        <div className="w-[350px] h-[82px] flex flex-col gap-[40px] items-start">
                            <span>분류</span>
                            <span className="text-[18px]">{type}</span>
                        </div>
                        <div className="flex flex-col gap-[40px] items-start">
                            <span>지역/컨텐츠</span>
                            <span className="text-[18px]">{title}</span>
                        </div>
                        <div className="w-[100px] h-[100px] ml-[160px] relative">
                            {String(progress) && (
                                <>
                                    <RadialBarChart data={[{ id: 'chart', data: [{ x: 'progress', y: progress }] }]} />
                                    <p className="absolute text-[36px] font-semibold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                        {progress}%
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                
            </div>
            
        </>
    );
}
