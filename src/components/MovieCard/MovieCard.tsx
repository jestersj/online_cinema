import React, {FC} from 'react';
import {IMovie, ISimilarMovie} from "@/types/IMovie";
import poster from "@/assets/poster.jpg"
import {Link} from "react-router-dom";
import s from "./MovieCard.module.css";

interface Props {
    item: IMovie | ISimilarMovie,
    isSmall?: boolean
}

const Card: FC<Props> = ({item, isSmall = false}) => {
    return (
        <Link to={`/${item.id}`} className={s.card}>
            <div className={s.img_block}>
                <img src={item.poster.url ?? poster} alt={item.name} className={s.img}/>
                {
                    "rating" in item && item.rating && <div className={s.rating}>{item.rating.kp}</div>
                }
            </div>
            <p>{item.name}</p>
        </Link>
    );
};

export default Card;