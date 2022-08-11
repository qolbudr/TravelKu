let BASE_URL = "https://test.api.amadeus.com"
let CLIENT_SECRET = "okrOskwiniVGAogG"
let CLIENT_ID = "0BMoDFEZ1GGCjcns4fFsTo6H2AoJFarL"

const fetchToken = async () => {
    const data = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'grant_type': 'client_credentials'
    }

    const token = await fetch(`${BASE_URL}/v1/security/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams((data))
    })

    return token.json();
}

const checkToken = async (token) => {
    const data = await fetch(`${BASE_URL}/v1/security/oauth2/token/${token}`);
    return data.json()
}

export const getToken = async () => {
    const savedToken = localStorage.getItem('amadeusToken') ?? "{}";
    const token = JSON.parse(savedToken)
    if(!token.hasOwnProperty('expires_in')) {
        const grabToken = await fetchToken();
        localStorage.setItem('amadeusToken', JSON.stringify(grabToken))
        return grabToken;
    } else {
        const tokenInfo = await checkToken(token.access_token);
        if(tokenInfo.expires_in <= 0) {
            const grabToken = await fetchToken();
            localStorage.setItem('amadeusToken', JSON.stringify(grabToken))
            return grabToken;
        }   
        return token;
    }
}