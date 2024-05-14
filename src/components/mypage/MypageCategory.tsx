'use client'
import { userState } from '@/atom/userStore';
import React from 'react';
import { useRecoilValue } from 'recoil';
import Divider from '../common/Divider';

export default function MypageCategory() {

    const userInfo = useRecoilValue(userState);

    return (
        <div className='w-[220px] flex flex-col'>
            <div className='w-full flex flex-col items-center justify-center'>
                <img src="/images/profile.jpeg" alt="프로필 이미지" className='w-[70px] h-[70px] rounded-lg' />
                <div className='w-full flex gap-1 items-center justify-center'>
                    <p className='text-[24px] font-[700] text-[#030303]'>{userInfo.userName}</p>
                    <img src="/images/editIcon.svg" alt="수정이미지" className='w-[35px] h-[35px]' />
                </div>
            </div>
            
        </div>
    );
}

