import axios from 'axios';
import Cookies from 'universal-cookie'

const cookies = new Cookies();

export const validateCode = async (code) => {
    const headers = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'X-CSRFTOKEN': cookies.get('csrftoken'),
        }
    };
    return axios.post('http://127.0.0.1:8000/accounts/code', {code: code}, headers)
    .then(x => x.data)
    .then(y => { return y})
    .catch(err => {return err});
}

export const registerProfile = async (profile) => {
    const data = new FormData();
    data.append('file', profile.file);
    for (const [key, value] of Object.entries(profile)) {
        data.append(key, value);
    }
    

    return axios.post('http://127.0.0.1:8000/accounts/register', data, {  
    headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'X-CSRFTOKEN': cookies.get('csrftoken'),
      }})
      .then(x => x.data)
      .then(y => { return y})
      .catch(err => {return err});
      
}

export const userExists = async (username) => {
    return axios.post('http://127.0.0.1:8000/accounts/user_exists', {username: username})
    .then(x => x.data)
    .then(y => { return y})
    .catch(err => {return err});
}

export const emailExists = async (email) => {
    return axios.post('http://127.0.0.1:8000/accounts/email_exists', {email: email})
    .then(x => x.data)
    .then(y => { return y})
    .catch(err => {return err});
}