interface PlaceType {
    name: string;
    place: {
        [key: string]: string[];
    }
}

export const CONTENT_PLACE: Record<string, PlaceType> = {
    'seoul': {
        name: '서울특별시',
        place: {
            '종로-고궁': ['경복궁', '북촌한옥마을', '갈고당길', '운현궁', '창경궁'],
            '종로-공원과 카페': [],
            '마포-맛집': [],
            '용산,중구': [],
        },
    },
};
