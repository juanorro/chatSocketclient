
const baseUrl = 'http://localhost:8080/api';

export const fetchSinToken = async(endpoint, data, method = 'GET') => {
    const url = `${ baseUrl }/${ endpoint }`;
    console.log('esto es la url', url)

    if(method === 'GET') {
        const res = await fetch(url);
        return await res.json();
    } else {
        const res = await fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await res.json();
    }

}

export const fetchConToken = async(endpoint, data, method = 'GET') => {
    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token') || '';
    console.log(token)

    if(method === 'GET') {
        const res = await fetch(url, {
            headers: {
                'x-token': token
            }
        });

        return await res.json();

    } else {

        const res = await fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },

            body: JSON.stringify(data)

        });

        return await res.json();
    };
};