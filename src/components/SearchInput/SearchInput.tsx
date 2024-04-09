import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import s from "./SearchInput.module.css";

const SearchInput = () => {
    const [value, setValue] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)
    const navigate = useNavigate()

    const handleSearch = (value: string) => {
        navigate(`/?query=${value}`)
        addToSearchHistory(value)
        setShowSuggestions(false)
        setValue('')
    }

    const getSearchHistory = () => {
        return JSON.parse(localStorage.getItem('history')) as string[]
    }

    const setSearchHistory = (history: string[]) => {
        localStorage.setItem('history', JSON.stringify(history))
    }

    const addToSearchHistory = (item: string) => {
        if (!localStorage.getItem('history')) {
            localStorage.setItem('history', JSON.stringify([]))
        }
        const history = getSearchHistory()
        if (!history.includes(item) && item) {
            if (history.length > 19) {
                history.pop()
            }
            history.unshift(item)
            setSearchHistory(history)
        }
    }


    const getSuggestions = (value: string) => {
        const history = getSearchHistory()
        const suggestions = history.filter(el => el.toLowerCase().includes(value.toLowerCase()))
        return suggestions.length <= 6 ? suggestions : suggestions.slice(0, 6)
    }

    const debouncedValue = useDebounce(value, 1000)

    const searchInputRef = useRef(null)
    useEffect(() => {
        function handleClickOutside(event: { target: any; }) {
            if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
                setShowSuggestions(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        };
    }, [searchInputRef]);
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                handleSearch(value)
            }}
            className={s.form}
            ref={searchInputRef}
        >
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onClick={() => setShowSuggestions(true)}
                placeholder={'Поиск'}
                className={s.input}
            />
            {
                showSuggestions &&
                <ul className={s.suggestions_block}>
                    {getSuggestions(debouncedValue)?.map(el =>
                        <li key={el}>
                            <Link to={`/?query=${el}`} onClick={() => setShowSuggestions(false)}>
                                {el}
                            </Link>
                        </li>
                    )}
                </ul>
            }
        </form>
    );
};

export default SearchInput;