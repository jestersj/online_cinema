import {IMovie} from "@/types/IMovie";

export interface IMoviesResponse {
    docs: IMovie[]
    limit: number
    page: number
    pages: number
}