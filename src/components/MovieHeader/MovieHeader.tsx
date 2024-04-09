import React, {FC} from 'react';
import {IMovie} from "@/types/IMovie";
import poster from "@/assets/poster.jpg"
import {useNavigate} from "react-router-dom";
import s from './MovieHeader.module.css';

interface Props {
    info: IMovie
}

const MovieHeader: FC<Props> = ({info}) => {
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }
    return (
        <div>
            <button onClick={goBack} className={s.back_btn}>{'<'} На предыдущую страницу</button>
            <section className={s.header_section}>
                <div className={s.block}>
                    <img src={info.logo?.url} alt={info.name} className={s.logo}/>
                    <ul className={s.ul}>
                        <li className={s.box}>{info.rating.kp}</li>
                        <li>{info.name}</li>
                        <li>{info.year}</li>
                    </ul>
                    <p>{info.description}</p>
                </div>
                <div className={s.poster}>
                    <img src={info.poster.url} alt={poster}/>
                </div>
            </section>
            <div className={s.col}>
                <div className={s.cell}>
                    <p className={s.info_key}>Страны:</p>
                    <p className={s.info_value}>{info.countries.map(el => `${el.name} `)}</p>
                </div>
                <div className={s.cell}>
                    <p className={s.info_key}>Жанры</p>
                    <p className={s.info_value}>{info.genres.map(el => `${el.name} `)}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieHeader;