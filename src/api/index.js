// api/api.js

import axios from 'axios';

const baseUrl = 'https://jp2malu3r8.execute-api.us-east-1.amazonaws.com/dev';

const api = axios.create({
    baseURL: baseUrl,
});

export default api;
