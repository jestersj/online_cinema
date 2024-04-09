import React, {FC, useState} from 'react';
import Carousel from "../Carousel/Carousel";
import SeriesItem from "../SeriesItem/SeriesItem";
import {ISeason} from "@/types/ISeason";
import DropdownSeasons from "@/components/DropdownSeasons/DropdownSeasons";
import s from './SeriesList.module.css';

interface Props {
    seasons: ISeason[]
}

const SeriesList: FC<Props> = ({seasons}) => {
    const [activeSeason, setActiveSeason] = useState(seasons[0])
    return (
        <section>
            <div className={s.seasons}>
                <h2>Сезоны</h2>
                <div className={s.desktop}>
                    {
                        seasons.map(season =>
                            <button key={season.id}
                                    className={[s.circle, activeSeason.id === season.id ? s.active : s.not_active].join(' ')}
                                    onClick={() => setActiveSeason(season)}
                            >
                                {season.name}
                            </button>
                        )
                    }
                </div>
                <div className={s.mobile}>
                    <DropdownSeasons selectedItem={activeSeason} items={seasons} onSelect={setActiveSeason}/>
                </div>
            </div>
            <Carousel gap={20} title={activeSeason?.name ?? 'Сезон'}>
                {
                    activeSeason?.episodes.map(episode =>
                        <SeriesItem episode={episode} key={episode.name}/>
                    )
                }

            </Carousel>

        </section>
    );
};

export default SeriesList;