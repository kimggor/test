import Divider from '@/components/common/Divider';
import Link from 'next/link';
import React from 'react';

export default function page() {
    return (
        <div className='w-full min-w-[1920px] flex flex-col items-center'>
            <Divider />

            <div className='w-full flex items-center justify-center gap-[210px] mt-[181px]'>
                <Link href={'mypage/totalRoute'} className='flex flex-col items-center'>
                    <p className='text-[36px]'>전체 현황 보기</p>
                    <img className='w-[225px] h-[225px]' src="/images/전체지도.jpg" alt="" />
                </Link>
                <Link href={'mypage/myRoute'} className='flex flex-col items-center'>
                    <p className='text-[36px]'>내가 저장한 경로 보기</p>
                    <img className='w-[225px] h-[225px]' src="/images/경로.jpg" alt="" />
                </Link>
                <Link href={''} className='flex flex-col items-center'>
                    <p className='text-[36px]'>캘린더</p>
                    <img className='w-[225px] h-[225px]' src="/images/캘린더.jpg" alt="" />
                </Link>

            </div>
            
        </div>
    );
}

