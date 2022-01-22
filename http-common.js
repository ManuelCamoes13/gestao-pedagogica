import axios from 'axios';

const http = axios.create({
    baseURL:'http://localhost:3333/api',
    // baseURL:'https://gestaopedagogica.herokuapp.com/api'

});

export default http;