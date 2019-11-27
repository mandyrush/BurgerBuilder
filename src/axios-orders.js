import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-572df.firebaseio.com/'
});

export default instance;