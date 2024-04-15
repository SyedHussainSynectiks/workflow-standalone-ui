// api/api.js

import axios from 'axios';

const baseUrl = 'https://sux5ckl6l6.execute-api.us-east-1.amazonaws.com/stage';

const api = axios.create({
    baseURL: baseUrl,
});

export default api;
