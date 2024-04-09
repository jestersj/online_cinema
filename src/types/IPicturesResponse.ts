import {IPicture} from "@/types/IPicture";

export interface IPicturesResponse {
    docs: IPicture[]
    limit: number
    page: number
    pages: number
}