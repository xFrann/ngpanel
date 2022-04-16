import axios from 'axios'
import { useEffect, useState } from 'react'


export const useFetchedData = (url) => {

    const [fetchedData, setFetchedData] = useState({fetchedData: null, loading: true})

    useEffect(() => {
        setFetchedData({fetchedData: null, loading: true})
        axios.get(url).then(x => x.data).then(y => {setFetchedData({fetchedData: checkIfUserRequest(y), loading: false})})
    }, [url])

    return fetchedData;
}

/**
 * 
 * @param {JSON} data 
 * Checks if the data is an user data request,
 * if so, it returns the user object directly,
 * without having to access it when the hook is used.
 * (turns fetchedData.user to user directly)
 * Useful in case you deconstruct with variable named user.
 * (instead of user.user, you can use directly user.)
 * @returns 
 */
const checkIfUserRequest = (data) => {
    if (data.user) {
        return data.user
    }
    return data;
}