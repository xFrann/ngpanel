import axios from 'axios'
import { useEffect, useState } from 'react'


export const useFetch = () => {


    const url = 'http://127.0.0.1:8000/accounts/get_user'
    const [user, setUser] = useState({user: null, loading: true})

    useEffect(() => {
        setUser({user: null, loading: true})
        axios.get(url).then(x => x.data).then(y => {setUser({user: y.user, loading: false})})
    }, [url])

    return user;
}