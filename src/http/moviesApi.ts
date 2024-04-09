import {$host} from "./index";
import {IMoviesResponse} from "@/types/IMoviesResponse";
import {IPicturesResponse} from "@/types/IPicturesResponse";
import {IMovie} from "@/types/IMovie";
import {ISeasonsResponse} from "@/types/ISeasonsResponse";
import {IReviewsResponse} from "@/types/IReviewsResponse";

export const fetchMovies = async (params: URLSearchParams): Promise<IMoviesResponse> => {
    if (params.get('query')) {
        const {data} = await $host.get(`/movie/search`, {
            params
        })
        return data
    }
    const {data} = await $host.get('/movie', {
        params
    })
    return data
}

export const fetchOneMovie = async (id: string): Promise<IMovie> => {
    const {data} = await $host.get(`/movie/${id}`)
    return data
}

export const fetchMoviePictures = async (id: string): Promise<IPicturesResponse> => {
    const {data} = await $host.get(`/image?movieId=${id}`)
    return data
}

export const fetchSeason = async (id: number): Promise<ISeasonsResponse> => {
    const {data} = await $host.get(`/season?movieId=${id}`)
    return data
}

export const fetchReviews = async (params: {}): Promise<IReviewsResponse> => {
    const {data} = await $host.get('/review', {
        params
    })
    return data
}

export const getRandomFilm = async (params: {}) => {
    const {data} = await $host.get('/movie/random', {
        params
    })
    return data
}