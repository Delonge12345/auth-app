import React, {Fragment} from 'react'
import {useHistory} from 'react-router-dom'
import {axiosInstance} from "../utils/axiosInstance";
import {changeHttpErrorStatus, handleHttpMeta} from "src/redux/errorsReducer";
import {useDispatch} from "react-redux";
import {refreshOutdatedToken} from "../contexts/AuthContext";


export const AxiosHandler = ({ children }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    axiosInstance.interceptors.response.use((response) => {
        return response;
    }, async function (error) {
        const originalRequest = error.config;
        console.log("Failed raw query: ", error.response)
        // redirects to /login page, if refresh token process is failed
        if (originalRequest._retry === false && error.response.status === 401)
            history.push('/login')
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = await refreshOutdatedToken();
            originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
            return axiosInstance(originalRequest);
        }
        if (error.response) {
            switch (error.response.status) {
                case 500:
                    const {headers, data, baseURL, url} = originalRequest
                    dispatch(handleHttpMeta({
                        headers,
                        data,
                        endpoint: baseURL + url.slice(1)
                    }))
                    dispatch(changeHttpErrorStatus(error.response.status))
                    return history.push(`/error/${error.response.status}`)
                case 402:
                    console.log("402 occurred...");
                    dispatch(changeHttpErrorStatus(402));
                    return history.push('/error')
                case 404:
                    dispatch(changeHttpErrorStatus(404));
                    return history.push('/error')
                default:
                    // throwing 800 fake status in case of other unexpected errors
                    dispatch(changeHttpErrorStatus(800));
                    return history.push('/error')
            }
        }
        return Promise.reject(error);
    });
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}