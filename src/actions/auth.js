import Cookies from 'universal-cookie'
import axios from 'axios';


const cookies = new Cookies();


export const getUser = async () => {
    const headers = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'X-CSRFTOKEN': cookies.get('csrftoken'),
        }
    };


    const res = await axios.get('http://127.0.0.1:8000/accounts/get_user', headers)

    if (res.data.user) {
        return res.data.user
    } else {
        return null;
    }

}

export const login = async (username, password) => {

    const headers = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'X-CSRFTOKEN': cookies.get('csrftoken'),
            'username': username,
            'password': password,
        }
    };

    const body = JSON.stringify({ username, password })

    try {
        const res = await axios.post('http://127.0.0.1:8000/accounts/login', body, headers)

        if (res.data.success) {
            return res.data;
        } else {
            return res.data.error;
        }

    } catch (error) {
        console.error(error)
    }
}

export const isAuthenticated = async () => {
    const headers = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'X-CSRFTOKEN': cookies.get('csrftoken'),
        }
    };

    try {
        const res = await axios.get('http://127.0.0.1:8000/accounts/authenticated', headers)
        if (res.data.error || res.data.success === 'error') {
            console.log("User is not authenticated")
        }
        else if (res.data.success) {
            return true;
        }
        else {
            console.error("Something went wrong")
        }
        
    } catch (error) {
        console.error("Error while requesting data")
        return false;

    }


}

export const getUserPictureURL = async (username) => {
    const headers = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'X-CSRFTOKEN': cookies.get('csrftoken'),
    }
}
    try {
        const res = await axios.get(`http://127.0.0.1:8000/profiles/user/${username}/`, headers)
        if (res.data.error || res.data.success === 'error') {
            console.log("Error while getting user profile picture")
        }
        else if (res.data.success) {
            return res.data.picture;
        }
        return res.data.picture;
    } catch {
        console.error("Error while requesting data")
    }
}


export const logout = async () => {
    const headers = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'X-CSRFTOKEN': cookies.get('csrftoken'),
        }
    };

    try {
        const res = await axios.post('http://127.0.0.1:8000/accounts/logout', {}, headers)
        if (res.data.error || res.data.success === 'error') {
            console.log("Error occured")
        }
        else if (res.data.success) {
            console.log("Logged out")
            return true;
        }
        else {
            console.error("Something went wrong")
            return false;
        }

    } catch (error) {
        console.error("Error while requesting data")
        return false;
    }


}