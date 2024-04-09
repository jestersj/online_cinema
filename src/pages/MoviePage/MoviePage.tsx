import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {fetchMoviePictures, fetchOneMovie, fetchSeason} from "@/http/moviesApi";
import {IMovie} from "@/types/IMovie";
import MovieHeader from "@/components/MovieHeader/MovieHeader";
import {IPicture} from "@/types/IPicture";
import Carousel from "@/components/Carousel/Carousel";
import MovieCard from "@/components/MovieCard/MovieCard";
import {ISeason} from "@/types/ISeason";
import SeriesList from "@/components/SeriesList/SeriesList";
import ReviewsSection from "@/components/ReviewsSection/ReviewsSection";
import PersonsSection from "@/components/PersonsSection/PersonsSection";
import Loading from "@/components/Loading/Loading";
import s from "./MoviePage.module.css";

const MoviePage = () => {
    const {movieId} = useParams()
    const location = useLocation()
    const [loading, setLoading] = useState(true)
    const [movieInfo, setMovieInfo] = useState<IMovie | null>(null)
    const [images, setImages] = useState<IPicture[] | null>(null)
    const [seasons, setSeasons] = useState<ISeason[] | null>(null)

    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            fetchOneMovie(movieId).then(res => {
                setMovieInfo(res)
                setLoading(false)
                return res
            })
                .then(movie => {
                    if (movie.isSeries) {
                        return fetchSeason(movie.id)
                    }
                })
                .then(res => {
                    if (res) {
                        setSeasons(res.docs.reverse().filter(season => season.duration))
                    }
                })
                .catch(() => navigate('/error'))

            fetchMoviePictures(movieId)
                .then(res => setImages(res.docs))
                .catch(() => navigate('/error'))

            setLoading(false)
        }
        fetchData()
        return () => {
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            })
            setMovieInfo(null)
            setSeasons(null)
            setImages(null)
        }
    }, [location.pathname])
    return (
        <div className={'custom_cont'}>
            <div className={s.cont}>
                {
                    !loading ?
                        <>
                            {
                                movieInfo &&
                                <MovieHeader info={movieInfo}/>
                            }
                            {
                                seasons &&
                                <SeriesList seasons={seasons}/>
                            }
                            <div className={s.d_flex}>
                                {
                                    images && images.length > 0 &&
                                    <div className={s.carousel_cont}>
                                        <Carousel title={'Изображения'} gap={20}>
                                            {
                                                images.map(image =>
                                                    <img
                                                        key={image.id}
                                                        src={image.url}
                                                        alt={''}
                                                        loading={'lazy'}
                                                        className={s.img}
                                                    />
                                                )
                                            }
                                        </Carousel>
                                    </div>
                                }
                                <div className={s.col}>
                                    {
                                        movieInfo &&
                                        <PersonsSection persons={movieInfo.persons}/>
                                    }
                                </div>
                            </div>
                            {
                                movieInfo &&
                                <>
                                    <ReviewsSection movieId={movieId}/>
                                    <Carousel title={'Похожие'} gap={20}>
                                        {
                                            movieInfo.similarMovies?.map(item =>
                                                <MovieCard item={item} key={item.id}/>
                                            )
                                        }
                                    </Carousel>
                                </>
                            }
                        </>
                        :
                        <Loading/>
                }
            </div>
        </div>
    )
        ;
};

export default MoviePage;