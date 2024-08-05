"use client";
import { UserType, userState } from "@/atom/userStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Divider from "../common/Divider";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("id");
      localStorage.removeItem("email");
      localStorage.removeItem("userName");
      localStorage.removeItem("token");
    }
    router.push("/");
  };

  const path = usePathname();
  const headerValidate = path === "/" || path === "/signUp";

  const HEADER_CATEGORY_LIST = [
    {
      name: "메인화면",
      path: "/choice",
    },
    {
      name: "마이페이지",
      path: "/mypage",
    },
  ];

  useEffect(() => {
    const userInfo = {
      userId: localStorage.getItem("id"),
      userEmail: localStorage.getItem("email"),
      userName: localStorage.getItem("userName"),
    };
    setUser(userInfo as UserType);
  }, []);

  return !headerValidate ? (
    <div className="w-full h-auto min-w-[320px] lg:min-w-[1920px] px-4 lg:px-[45px] py-4 lg:py-0 flex flex-row lg:flex-row items-center justify-between bg-white">
      <Link
        href={"/choice"}
        className="flex w-[300px] items-center mb-4 lg:mb-0"
      >
        <Image
          src="/logo/logo.png"
          alt="로고 이미지"
          width={50}
          height={50}
          className="lg:w-[100px] lg:h-[100px]"
        />
        <h1 className="text-[24px] lg:text-[36px] font-[700]">Movie Trip</h1>
      </Link>
      <ul className="w-full lg:w-auto flex flex-row lg:flex-row items-center justify-center gap-20 lg:gap-10 text-[16px] lg:text-[32px] mb-4 lg:mb-0">
        {HEADER_CATEGORY_LIST.map((item) => (
          <li key={item.name}>
            <Link
              href={item.path}
              className={`${
                path.includes(item.path) && "text-[#9356d6] font-[600]"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-10">
        <div
          className="bg-black border-2 border-purple-500 rounded-md px-2 py-1 flex items-center justify-center gap-1 cursor-pointer"
          onClick={handleLogout}
        >
          <img
            src="/images/Logout.png"
            alt="로그아웃"
            className="w-6 h-6 lg:w-8 lg:h-8"
          />
          <button className="text-[14px] lg:text-[18px] font-[500] text-white text-nowrap">
            로그아웃
          </button>
        </div>
        <Link href={"/mypage"} className="flex flex-col items-center">
          <Image
            src={"/images/Mypage.png"}
            alt="마이 페이지"
            width={40}
            height={40}
            className="lg:w-[60px] lg:h-[60px]"
          />
          <p className="text-[14px] lg:text-[18px] font-[700]">
            {user.userName}
          </p>
        </Link>
      </div>
    </div>
  ) : null;
}
