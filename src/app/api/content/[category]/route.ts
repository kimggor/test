import { getPrismaClient } from '@/utils/util';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { prisma } = getPrismaClient();
    const params = request.nextUrl.searchParams.get('category');
    console.log(params);

    try {
        if (!params) return NextResponse.json({ message: '카테고리를 잘못되었습니다.' });
        const findContentPlace = await prisma.seoulPlace.findMany({
            where: {
                category: params as string,
            },
            orderBy: {
                seqNo: 'asc',
            },
        });

        return findContentPlace && NextResponse.json({ findContentPlace });
    } catch (error) {
        console.error(error);
        NextResponse.json({ message: 'Internal server error' });
    }
}

export async function POST(request: NextRequest) {
    const { prisma } = getPrismaClient();
    const userProgressCreateData = await request.json();
    console.log(userProgressCreateData);
    try {
        const userSaveRoute = await prisma.userSaveRoute.findFirst({
            where: {
                content: userProgressCreateData.content,
            },
        });
        console.log(userSaveRoute);
        if (userSaveRoute) {
            return NextResponse.json({ code: 403, message: '이미 저장된 콘텐츠입니다.' });
        }
        const userProgressSaveRes = await prisma.userSaveRoute.create({
            data: userProgressCreateData,
        });

        return userProgressSaveRes && NextResponse.json({ userProgressSaveRes });
    } catch (error) {
        console.error(error);
        NextResponse.json({ message: 'Internal server error' });
    }
}

export async function PATCH(request: NextRequest) {
    const { prisma } = getPrismaClient();
    const userProgressUpdateData = await request.json();
    console.log(userProgressUpdateData);
    try {
        const userSaveRoute = await prisma.userSaveRoute.findFirst({
            where: {
                userId: Number(userProgressUpdateData.userId),
                content: userProgressUpdateData.content,
            },
        });

        if (userSaveRoute) {
            const prevData = JSON.parse(userSaveRoute.successRoute);
            const prevSuccessRoute = prevData.find(
                (route: any) => route.place === userProgressUpdateData.route.placeName
            );
            if (prevSuccessRoute) {

                // 이미 도착한 장소 예외처리
                if (prevSuccessRoute.isSuccess) {
                    return NextResponse.json({ code: 403, message: '이미 도착한 장소입니다.' });
                }

                // 도착한 장소 업데이트
                const updateRoute = prevData.map((route: any) => {
                    if (route.place === userProgressUpdateData.route.placeName) {
                        route.isSuccess = true;
                    }
                    return route;
                });

                // 업데이트된 데이터 저장
                const userProgressUpdateRes = await prisma.userSaveRoute.update({
                    where: {
                        userSaveRouteId: userSaveRoute.userSaveRouteId,
                    },
                    data: {
                        successRoute: JSON.stringify(updateRoute),

                        // 진행률 계산
                        progress: Math.round(
                            (updateRoute.filter((route: any) => route.isSuccess).length / updateRoute.length) * 100
                        ),
                    },
                });

                return userProgressUpdateRes && NextResponse.json({ userProgressUpdateRes });
            }
        }
    } catch (error) {
        console.error(error);
        NextResponse.json({ message: 'Internal server error' });
    }
}

