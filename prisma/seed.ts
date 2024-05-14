import { PrismaClient } from "@prisma/client"
import * as movieData from "../public/movieData.json"
import * as moviePlaceData from "../public/data.json"
import * as seoulPlaceData from "../public/서울-종로구.json"

const prisma = new PrismaClient();

async function seedData() {



    // movieData?.["DATA"]?.map(async (movie) => {
    //     const movieInfo = {
    //         title: movie.title,
    //         plot: movie.plot,
    //         releaseDate: movie.releaseDate,
    //         genre: movie.genre,
    //         audience: movie.type === '영화' ? movie.audience : null,
    //         peekview: movie.type === '드라마' ? movie.peekview : null,
    //         rating: movie.rating,
    //     }
    //     const result = await prisma.movie.create({data: movieInfo})
    //     console.log(result)
    // })

    // moviePlaceData?.["DATA"]?.map(async (movie) => {
    //     const moviePlaceInfo = {
    //         mediaType: movie.MEDIA_TY,
    //         title: String(movie.TITLE_NM),
    //         placeName: movie.PLACE_NM,
    //         placeType: movie.PLACE_TY,
    //         description: movie.RELATE_PLACE_DC,
    //         operTime: movie.OPER_TIME,
    //         restTime: movie.REST_TIME,
    //         closedDay: movie.RSTDE_GUID_CN,
    //         address: movie.ADDR,
    //         lat: movie.LC_LA,
    //         lng: movie.LC_LO,
    //     }
    //     const result = await prisma.moviePlace.create({data: moviePlaceInfo})
    //     console.log(result)
    // })

    seoulPlaceData?.["DATA"]?.map(async (place) => {
        const seoulPlaceInfo = {
            seqNo: place.SEQ_NO,
            placeName: place.PLACE_NM,
            address: place.ADDR,
            lat: place.LC_LA,
            lng: place.LC_LO,
            category: place.AREA,
            titmeName: place.TITLE_NM,
            placeDesc: place.RELATE_PLACE_DC,
            placeType: place.PLACE_TY,
        }
        const result = await prisma.seoulPlace.create({data: seoulPlaceInfo})
        console.log(result)
    })
}

async function main() {
    await seedData()
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    })