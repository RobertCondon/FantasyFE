const fetchMethod = (method) => async (endpoint, params = {}, options = {}) => {
    // Convert the params object into a query string
    const queryString = new URLSearchParams(params).toString();

    // Append the query string to the URL if it's not empty
    const url = `http://127.0.0.1:3000/api/${endpoint}`; // Your Rails API base URL
    // const url = `https://fantasynrlbe.onrender.com/api/${endpoint}`; // Your Rails API base URL

    const finalUrl = queryString ? `${url}?${queryString}` : url;

    // Set the HTTP method in the options
    options.method = method;

    try {
        const response = await fetch(finalUrl, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Fetch error for ${method}:`, error);
        throw error;
    }
};

// Create specific fetch functions for different HTTP methods
// const fetchGet = fetchMethod('GET');
const fetchPost = fetchMethod('POST');
const fetchPatch = fetchMethod('PATCH');
const fetchDelete = fetchMethod('DELETE');

export function fetchGet(endpoint, params = {}, options = {}) {
    return fetchMethod('GET')(endpoint, params, options)
}
// // Usage examples
// fetchGet('https://api.example.com/data', { key: 'value', page: 1 })
//     .then(data => console.log('GET response:', data))
//     .catch(error => console.error(error));
//
// fetchPost('https://api.example.com/data', {}, { body: JSON.stringify({ key: 'value' }) })
//     .then(data => console.log('POST response:', data))
//     .catch(error => console.error(error));