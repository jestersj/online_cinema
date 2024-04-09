import React, {FC} from 'react';
import {IReview} from "@/types/IReview";
import parse from "html-react-parser";
import s from "./ReviewItem.module.css";

interface Props {
    review: IReview
}

const ReviewItem: FC<Props> = ({review}) => {
    const getColor = () => {
        return review.type === 'Позитивный' ? s.positive : review.type === "Негативный" ? s.neutral : s.negative
    }
    return (
        <li
            className={[s.card, getColor()].join(' ')}
        >
            <b>{review.author}</b>
            <hr className={s.hr}/>
            <strong>{review.title}</strong>
            <p>{parse(review.review)}</p>
        </li>
    );
};

export default ReviewItem;