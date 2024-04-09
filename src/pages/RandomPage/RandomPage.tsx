import React, {useEffect, useState} from 'react';
import YearFilter from "@/components/YearFilter/YearFilter";
import {filters} from "@/consts";
import DropdownFilter from "@/components/DropdownFilter/DropdownFilter";
import {useNavigate} from "react-router-dom";
import {getRandomFilm} from "@/http/moviesApi";
import Loading from "@/components/Loading/Loading";
import {useAppSelector} from "@/hooks/redux";
import s from "./RandomPage.module.css";

const RandomPage = () => {
    const [years, setYears] = useState([1900, 2024])
    const [country, setCountry] = useState<string | null>(null)
    const [ageRating, setAgeRating] = useState<string | null>(null)
    const [kpRating, setKpRating] = useState<string | null>(null)
    const [production, setProduction] = useState<string | null>(null)
    const [type, setType] = useState<string | null>(null)
    const [genre, setGenre] = useState<string | null>(null)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const navigate = useNavigate()
    const toRandomMovie = async () => {
        const params = {
            year: `${years[0]}-${years[1]}`,
            'countries.name': country,
            'networks.items.name': production,
            isSeries: type === 'Сериал' ? true : type === 'Фильм' ? false : null,
            'rating.kp': kpRating,
            ageRating,
            'genres.name': genre


        }
        setIsLoading(true)
        setError(false)
        setIsLoading(true)
        try {
            const {id} = await getRandomFilm(params)
            navigate(`/${id}`)
        } catch (e) {
            setError(true)
        }
        setIsLoading(false)
    }

    const {isAuth} = useAppSelector(state => state.authSlice)
    useEffect(() => {
        if (!isAuth) {
            navigate('/')
        }
    }, [isAuth]);
    return (
        <div className={'custom_cont'}>
            <h2>Фильтры:</h2>
            <div className={s.filters}>
                <YearFilter values={years} onInput={setYears}/>
                <DropdownFilter
                    name={'Страна:'}
                    selectedItem={country}
                    items={filters.countries}
                    onSelect={setCountry}
                />
                <DropdownFilter
                    name={'Тип контента:'}
                    selectedItem={type}
                    items={filters.contentType}
                    onSelect={setType}
                />
                <DropdownFilter
                    name={'Возрастной рейтинг:'}
                    selectedItem={ageRating}
                    items={filters.ageRating}
                    onSelect={setAgeRating}
                />
                <DropdownFilter
                    name={'Сеть производства:'}
                    selectedItem={production}
                    items={filters.production}
                    onSelect={setProduction}
                />
                <DropdownFilter
                    name={'Рейтинг Кинопоиска:'}
                    selectedItem={kpRating}
                    items={filters.kpRating}
                    onSelect={setKpRating}
                />
            </div>

            {
                !isLoading ?
                    <div className={s.btn_cont}>
                        <button className={'gradient_button'} onClick={toRandomMovie}>Найти фильм</button>
                    </div>
                    :
                    <Loading/>
            }
            {
                error && <h3>Фильм не найден</h3>
            }
        </div>
    );
};

export default RandomPage;