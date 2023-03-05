import axios from 'axios';

const strapiUrl = process.env.STRAPI_URL;

export async function signIn({ email, password }) {
    const res = await axios.post(`${strapiUrl}/api/auth/local`, {
        identifier: email,
        password,
    });
    return res.data;
}

export async function signUp({ username, email, password }) {
    const res = await axios.post(`${strapiUrl}/api/auth/local/register`, {
        username: username,
        email: email,
        password,
    });
    return res.data;
}