import {IReview} from "@/types/IReview";

export interface IReviewsResponse {
    docs: IReview[]
    limit: number
    page: number
    pages: number
}