import React, {FC, useEffect, useState} from 'react';
import {fetchReviews} from "@/http/moviesApi";
import {useLocation} from "react-router-dom";
import ReviewItem from "@/components/ReviewItem/ReviewItem";
import PageSwitcher from "@/components/PageSwitcher/PageSwitcher";
import {IReviewsResponse} from "@/types/IReviewsResponse";
import Loading from "@/components/Loading/Loading";
import s from "./ReviewsSection.module.css";

interface Props {
    movieId: string
}

const ReviewsSection: FC<Props> = ({movieId}) => {
    const location = useLocation()
    const [reviews, setReviews] = useState<IReviewsResponse | null>(null)
    const [page, setPage] = useState(1)

    const fetchData = async (page: number) => {
        const res = await fetchReviews({movieId, page, limit: 5})
        setReviews(res)
    }

    useEffect(() => {
        fetchData(page)
        return () => {
            setReviews(null)
        }
    }, [page])

    useEffect(() => {
        setPage(1)
        fetchData(1)
    }, [location.pathname]);

    const toPreviousPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const toNextPage = () => {
        if (page < reviews.pages) {
            setPage(page + 1)
        }
    }
    return (
        <section>
            {
                reviews ?
                    <>
                        <h2>Отзывы</h2>
                        <ul className={s.ul}>
                            {
                                reviews.docs.length > 0 ?
                                    reviews.docs.map(review =>
                                        <ReviewItem review={review} key={review.id}/>
                                    )
                                    :
                                    <h3>Нет информации об отзывах</h3>
                            }
                        </ul>
                        <PageSwitcher currentPage={page}
                                      totalPages={reviews.pages}
                                      toPreviousPage={toPreviousPage}
                                      toNextPage={toNextPage}
                        />
                    </>
                    :
                    <Loading/>
            }
        </section>
    );
};

export default ReviewsSection;