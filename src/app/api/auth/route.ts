import { getPrismaClient } from '@/utils/util';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { prisma } = getPrismaClient();
    const email = request.nextUrl.searchParams.get('email');
    console.log(email);

    try {
        if (email) {
            const user = await prisma.user.findUnique({
                where: {
                    email: email as string,
                },
            });
            return user
                ? NextResponse.json({ data: user.userId, status: 200 })
                : NextResponse.json({ message: '아이디 찾기를 실패했습니다.', status: 404 });
        }
        return NextResponse.json({ message: '아이디 찾기를 실패했습니다.', status: 404 });
    } catch (error) {
        console.error(error);
        NextResponse.json({ message: 'Internal server error' });
    }
}
