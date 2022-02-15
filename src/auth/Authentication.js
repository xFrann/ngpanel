
const axios = require('axios')

export async function login(email, password) {
    const postData = {
        username: email,
        password: password
    };

    const headers = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        }
    };
    try {
        validateData(postData);
        const response = await axios.post('http://127.0.0.1:8000/api/login/', postData, headers)
        return response.data;
    } catch (error) {
        console.log("[Authenticate] " + error)
    }
};

export const getUser = async (token) => {
    return axios.get('http://127.0.0.1:8000/api/users/me', {headers: {'Authorization': "Bearer " + token}})
}

function validateData(data) {
    // If any field from the form is blank, throw error.
    for (var field in data) {
        if (data[field] === null || data[field] === '') {
            throw new Error('Username or password is blank');
        }
    }
}