import React, {useEffect, useState} from 'react';
import {fetchMovies} from "@/http/moviesApi";
import {useNavigate, useSearchParams} from "react-router-dom";
import {IMovie} from "@/types/IMovie";
import MovieCard from "@/components/MovieCard/MovieCard";
import PageSwitcher from "@/components/PageSwitcher/PageSwitcher";
import {IMoviesResponse} from "@/types/IMoviesResponse";
import YearFilter from "@/components/YearFilter/YearFilter";
import DropdownFilter from "@/components/DropdownFilter/DropdownFilter";
import {filters} from "@/consts";
import Loading from "@/components/Loading/Loading";
import s from "./MainPage.module.css";

const limits = [10, 20, 50, 100]

const MainPage = () => {
    const [response, setResponse] = useState<IMoviesResponse | null>(null)
    const [movies, setMovies] = useState<IMovie[]>([])
    const [searchParams, setSearchParams] = useSearchParams();

    const [years, setYears] = useState([1900, 2024])
    const [country, setCountry] = useState<string | null>(null)
    const [ageRating, setAgeRating] = useState<string | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        setMovies([])
        const getData = async () => {
            try {
                const res = await fetchMovies(searchParams)
                setResponse(res)
                setMovies(res.docs)
            } catch (e) {
                navigate('/error')
            }
        }
        getData()
    }, [searchParams])

    const toPreviousPage = () => {
        const currPage = Number(searchParams.get('page') || 1)
        if (currPage > 1) {
            searchParams.set('page', String(currPage - 1))
            setSearchParams(searchParams)
        }
    }

    const toNextPage = () => {
        const currPage = Number(searchParams.get('page') || 1)
        if (response.pages > currPage) {
            searchParams.set('page', String(currPage + 1))
            setSearchParams(searchParams)
        }
    }
    const changeLimit = (limit: number) => {
        searchParams.set('limit', String([limit]))
        setSearchParams(searchParams)
    }

    const applyFilters = () => {
        searchParams.delete('query')

        if (country) {
            searchParams.set('countries.name', country)
        } else {
            searchParams.delete('countries.name')
        }

        if (ageRating) {
            searchParams.set('ageRating', ageRating)
        } else {
            searchParams.delete('ageRating')
        }

        searchParams.set('year', `${years[0]}-${years[1]}`)

        setSearchParams(searchParams)
    }

    const restoreFilters = () => {
        setCountry(searchParams.get('countries.name') ?? null)
        const restoredYears = searchParams.get('year')?.split('-').map(el => Number(el))
        setYears(restoredYears ?? [1900, 2024])
        setAgeRating(searchParams.get('ageRating') ?? null)
    }

    const removeFilters = () => {
        setCountry(null)
        setYears([1900, 2024])
        setAgeRating(null)
        searchParams.delete('countries.name')
        searchParams.delete('ageRating')
        searchParams.delete('year')
        searchParams.delete('query')
        setSearchParams(searchParams)
    }

    useEffect(() => {
        restoreFilters()
    }, []);
    return (
        <div className={'custom_cont'}>
            <div>
                <h2>Фильтры</h2>
                <div className={s.filters_block}>
                    <div className={s.filter_col}>
                        <YearFilter values={years} onInput={setYears}/>
                    </div>
                    <div className={s.filter_col}>
                        <DropdownFilter
                            name={'Страна:'}
                            selectedItem={country}
                            items={filters.countries}
                            onSelect={setCountry}
                        />
                    </div>
                    <div className={s.filter_col}>
                        <DropdownFilter
                            name={'Возрастной рейтинг:'}
                            selectedItem={ageRating}
                            items={filters.ageRating}
                            onSelect={setAgeRating}
                        />
                    </div>
                </div>
                <div className={s.btn_block}>
                    <button onClick={applyFilters} className={'gradient_button'}>Применить фильтры</button>
                    <button onClick={removeFilters} className={'gray_btn'}>Сбросить фильтры</button>
                </div>
            </div>
            {
                searchParams.get('query') &&
                <h3>Результаты по запросу: {searchParams.get('query')}</h3>
            }
            {
                movies.length > 0 ?
                    <div className={s.list}>
                        {
                            movies.map(item =>
                                <MovieCard item={item} key={item.id}/>
                            )
                        }
                    </div>
                    :
                    <Loading/>
            }

            <div>
                <PageSwitcher
                    currentPage={Number(searchParams.get('page')) || 1}
                    totalPages={response?.pages}
                    toPreviousPage={toPreviousPage}
                    toNextPage={toNextPage}
                />
            </div>

            <div className={s.limit_block}>
                Фильмов на странице:
                {
                    limits.map(limit =>
                        <button
                            key={limit}
                            onClick={() => changeLimit(limit)}
                            disabled={limit === Number(searchParams.get('limit')) || (!searchParams.get('limit') && limit === 10)}
                        >
                            {limit}
                        </button>
                    )
                }
            </div>
        </div>
    );
};

export default MainPage;