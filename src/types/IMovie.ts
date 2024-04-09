import {IPerson} from "@/types/IPerson";

export interface IMovie {
    id: number
    name: string
    poster: {
        url: string
    }
    rating: {
        kp: number
    }
    logo: {
        url: string
    }
    description: string
    backdrop: {
        url: string
    }
    year: number
    isSeries: boolean
    genres: {
        name: string
    }[]
    countries: {
        name: string
    }[]
    persons: IPerson[]
    similarMovies: ISimilarMovie[]
}

export interface ISimilarMovie {
    id: number
    name: string
    poster: {
        url: string
    }
}