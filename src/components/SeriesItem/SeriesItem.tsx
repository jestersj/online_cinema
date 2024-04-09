import React, {FC} from 'react';
import {IEpisode} from "@/types/IEpisode";
import cinema from "@/assets/cinema.jpg";
import s from './SeriesItem.module.css';


const getMinutesString = (number: number) => {
    const lastTwoDigits = number % 100;
    const lastDigit = lastTwoDigits % 10;
    let minutesString;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        minutesString = 'минут';
    } else {
        switch (lastDigit) {
            case 1:
                minutesString = 'минута';
                break;
            case 2:
            case 3:
            case 4:
                minutesString = 'минуты';
                break;
            default:
                minutesString = 'минут';
        }
    }
    return number !== null ? `${number} ${minutesString}` : '';
}

interface Props {
    episode: IEpisode
}

const SeriesItem: FC<Props> = ({episode}) => {
    return (
        <div className={s.item}>
            <button>
                <img src={episode.still.url || cinema} alt={episode.name} className={s.img}/>
                <p className={s.white_text}>{episode.number}. {episode.name}</p>
                <p className={s.gray_text}>{getMinutesString(episode.duration)}</p>
            </button>
        </div>
    );
};

export default SeriesItem;