import Divider from '@/components/common/Divider';
import ContentPlaceBox from '@/components/contentPlace/ContentPlaceBox';
import { CONTENT_PLACE } from '@/utils/constants';
import React from 'react';

export default function RegionDetailPage({params: {name}}: {params: {name: string}}) {
    console.log(name)
    const placeKey = Object.keys(CONTENT_PLACE[name].place);

    return (
        <div className='w-full min-w-[1920px] flex flex-col items-center'>
            <Divider />
            <div className='w-full flex items-center justify-center gap-2 mt-[50px]'>
                <img className='w-[120px] h-[80px]' src={`/images/region/${CONTENT_PLACE[name].name}.jpg`} alt="지역 사진" />
                <h1 className='text-[27px]'>{CONTENT_PLACE[name].name}</h1>
            </div>
            <div className='w-full flex items-center justify-center mt-[125px] gap-[72px]'>
                {
                    placeKey.map((placeName, i) => {
                        console.log(CONTENT_PLACE[name].place[placeName])
                        return <ContentPlaceBox key={i} region={name} placeName={placeName} />
                    })
                }
            </div>
        </div>
    );
}

