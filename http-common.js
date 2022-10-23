import axios from 'axios';

const http = axios.create({
    // baseURL:'https://gestaoapi.herokuapp.com',
    // baseURL:'https://gestaopedagogica.herokuapp.com/api'
    baseURL:'http://localhost:3333/api'

});

export default http;