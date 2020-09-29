import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-amazo-is.cloudfunctions.net/api' // where we have the (cloud function) api url
});

export default instance;