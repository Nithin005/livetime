import axios from 'axios';
import config from './config'

const axiosInstance = axios.create({
    baseURL: config.apiUrl,
})

const reqHandler = (req) => {
    if (req.enableReq) {
        const AUTH_TOKEN = localStorage.getItem('JWT');
        if(AUTH_TOKEN === null){
            return req;
          }
        req.headers['Authorization'] = 'JWT '+ AUTH_TOKEN;
    }
    return req
}


const resHandler = (res) => {
    if (res.config.enableRes) {
        //Todo
    }
    return res
}

const errHandler = (err) => {
    if (err.config.enableErr) {
        //Todo
    }
    return Promise.reject({ ...err });
}

axiosInstance.interceptors.request.use(
    request => reqHandler(request),

)

axiosInstance.interceptors.response.use(
    response => resHandler(response),
    error => errHandler(error)
  )
  

export default axiosInstance;