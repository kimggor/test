import React from 'react';

export default function PlaceCard({
    region,
    placeName,
    isPlace,
}: {
    region: string;
    placeName: string;
    isPlace?: boolean;
}) {
    return (
        <div className="w-[244px] flex flex-col gap-[7px] items-center">
            <img
                className="w-full h-[155px]"
                src={
                    isPlace
                        ? `/images/place/${region}/${placeName}.png`
                        : `/images/content/seoul/${region}/${placeName}.jpg`
                }
                alt=""
            />
            <div className="w-full grid place-items-center rounded-[10px] border border-black">
                <p className="text-[16px]">{placeName}</p>
            </div>
        </div>
    );
}
