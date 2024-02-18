async function fetchAPI(endpoint, options = {}) {
    const baseUrl = 'http://127.0.0.1:3000'; // Your Rails API base URL
    const response = await fetch(`${baseUrl}/${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}

export function getTeams() {
    return fetchAPI('teams');
}
