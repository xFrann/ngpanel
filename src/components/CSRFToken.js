import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'; 
import { ContactlessOutlined } from '@mui/icons-material';
/**
 * 
 * @returns hidden input field that send CSRF token with form HTTP Requests
 */
export default function CSRFToken() {

    const [csrftoken, setcsrftoken] = useState('');

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get('http://127.0.0.1:8000/accounts/csrf_cookie')
            } catch (error) {
                console.log("Error while fetching CSRF Token" + error)
            }
        };
        fetchData();
        setcsrftoken(getCookie('csrftoken'));
    }, []);

  return (
    <input type='hidden' name='csrfmiddlewaretoken' value={csrftoken}/>
  )
}
