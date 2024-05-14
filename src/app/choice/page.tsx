'use client'
import Divider from '@/components/common/Divider';
import useWatchLocation from '@/hooks/useWatchLocation';
import Link from 'next/link';
import React from 'react';

export default function Choice() {

    return (
        <div className='w-full h-full min-w-[1920px] flex flex-col items-center'>
            <Divider />
            <div className='w-full flex items-center justify-center mt-[45px] gap-[305px]'>
                <Link href={'movies'} className='flex flex-col items-center gap-10 cursor-pointer'>
                    <h2 className='text-lg font-bold'>콘텐츠를 직접 선택 후 경로 만들고 여행가기</h2>
                    <img src="/images/content.jpg" alt="content" />
                </Link>
                <Link href={'region'} className='flex flex-col items-center gap-10 cursor-pointer'>
                    <h2 className='text-lg font-bold'>콘텐츠를 직접 선택 후 경로 만들고 여행가기</h2>
                    <img src="/images/region.jpg" alt="content" />
                </Link>
            </div>
        </div>
    );
}

