import axios from "axios";

const $host = axios.create({
    baseURL: 'https://api.kinopoisk.dev/v1.4',
    headers: {
        'X-API-KEY': process.env.TOKEN
    }
})

export {
    $host
}