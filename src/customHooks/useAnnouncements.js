import axios from 'axios'
import { useEffect, useState } from 'react'


export const useAnnouncements = (url) => {


    // const url = 'http://127.0.0.1:8000/accounts/get_user'
    const [announcement, setAnnouncement] = useState({announcement: null, loading: true})

    useEffect(() => {
        setAnnouncement({announcement: null, loading: true})
        axios.get(url).then(x => x.data).then(y => {setAnnouncement({announcement: y, loading: false})})
    }, [url])

    return announcement;
}