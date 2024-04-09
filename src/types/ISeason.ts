import {IEpisode} from "@/types/IEpisode";

export interface ISeason {
    id: string
    name: string
    episodes: IEpisode[]
    duration: number
}
