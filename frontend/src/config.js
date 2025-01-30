const API_URL = process.env.REACT_APP_API_URL;
console.log('API URL:', API_URL); // For debugging
if (!API_URL) {
    throw new Error('REACT_APP_API_URL is not defined');
}
export default API_URL; 