interface PlaceType {
  name: string;
  place: {
    [key: string]: string[];
  };
}

export const CONTENT_PLACE: Record<string, PlaceType> = {
  seoul: {
    name: "서울특별시",
    place: {
      "종로-고궁": ["경복궁", "북촌한옥마을", "갈고당길", "운현궁", "창경궁"],
      "종로-공원과 카페": [],
      "마포-맛집": [],
      "용산,중구": [],
    },
  },
  jeolla: {
    name: "전라도",
    place: {
      광주: [
        "무등산 증심사",
        "518 기념공원",
        "1913 송정역시장",
        "광주호 호수생태공원",
        "양림동 역사문화마을",
      ],
      순천: [],
      담양: [],
      전주: [],
    },
  },
  incheon: {
    name: "인천광역시",
    place: {
      "동구 - 랜드마크, 유적지": [
        "인천문화예술회관",
        "솔빛송현근린공원",
        "수도국산달동네박물관",
        "한미서점",
        "화도진공원",
      ],
      "서구 - 자연테마": [],
      "중구 - 바다": [],
      "연수구 - 첨단문화, 맛집": [],
    },
  },
  gyeonggi: {
    name: "경기도",
    place: {
      "중부 - 휴양, 여가": [
        "청계산",
        "13애비뉴",
        "에버랜드",
        "캐리비안베이",
        "용인자연휴양림",
      ],
      "동부 -역사문화유산": [],
      "남부 - 첨단문화": [],
      "북부 - 자연, 야외활동": [],
    },
  },
  gangwon: {
    name: "강원특별자치도",
    place: {
      "춘천 - 자연테마": [
        "김유정역",
        "김유정문학촌",
        "강촌레일파크",
        "제이드가든",
        "남이섬",
      ],
      "강릉 - 유명 관광지": [],
      "동해 - 자연관광": [],
      "정선 - 즐길거리": [],
    },
  },
  chungcheong: {
    name: "충청도",
    place: {
      "논산-자연, 테마": [
        "선샤인랜드",
        "선샤인스투디오",
        "온누리딸기농장",
        "탑정호 출렁다리",
        "탑정호 수변생태공원",
      ],
      "아산-자연, 테마": [],
      "청주-맛집, 카페": [],
      "충주-체험": [],
    },
  },
  gyeongsang: {
    name: "경상도",
    place: {
      "군위-힐링": [
        "군위한밤마을 돌담길",
        "역전상회(떡방앗간)",
        "보호수나무",
        "리틀포레스트 촬영지(주인공의 집)",
        "일연공원",
      ],
      "포항-박물관, 맛집": [],
      "합천-테마파크": [],
      "안동-문화, 맛집": [],
    },
  },
  busan: {
    name: "부산,대구",
    place: {
      "서부산 - 자연여행": [
        "송도구름산책로",
        "감천문화마을",
        "아미산전망대",
        "다대포 꿈의 낙조분수",
        "낙동강하구 에코센터",
      ],
      "동래.서면.원도심 - 볼거리": [],
      "동부산 - 힐링여행": [],
      "대구 - 볼거리": [],
    },
  },
};
