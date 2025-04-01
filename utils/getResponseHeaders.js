export const getResponseHeaders = () => {
    return {
        'Access-Control-Allow-Origin': 'https://snapsjsx.netlify.app',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Content-Type': 'application/json'
    }
}