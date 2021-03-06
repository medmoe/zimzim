import React, {FormEvent, useEffect, useState} from 'react';
import axios from "axios";
import {LoginForm} from "./LoginForm";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks";
import {updateIsAuthenticated, updateUsername} from "./customerSlice";
import styles from "./Customer.module.css";

interface CustomerLoginData {
    username: string;
    password: string;
    isCustomer: boolean;
}

export function CustomerLogin() {
    const [customerLoginData, setCustomerLoginData] = useState<CustomerLoginData>({password: "", username: "", isCustomer: true})
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        const call = async () => {
            await axios.get('http://localhost:8000/home/', {withCredentials: true})
                .then((res) => {
                    dispatch(updateIsAuthenticated(true));
                    dispatch(updateUsername(res.data.username));
                    navigate('/');
                })
                .catch((err) => {
                    const {username, password, message} = err.response.data;
                    !username && !password ? console.log("Do Nothing!") : setErrorMessage(message);
                })
        }
        call();
    }, [errorMessage])
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const options = {
            headers: {
                'content-type': 'application/json'
            },
            withCredentials: true,
        }
        await axios.post("http://localhost:8000/login/", JSON.stringify(customerLoginData), options)
            .then((res) => {
                dispatch(updateUsername(customerLoginData.username));
                dispatch(updateIsAuthenticated(true));
                navigate('/');
            })
            .catch((err) => {
                setErrorMessage(err.response.data.Message);
            })
    }
    const handleInputChange = (event: FormEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement
        setCustomerLoginData({
            ...customerLoginData,
            [target.name]: target.value,
        })
    }
    const handleProviderChange = (event: FormEvent) => {
        setCustomerLoginData({
            ...customerLoginData, isCustomer: false
        })
    }
    const handleCustomerChange = (event: FormEvent) => {
        setCustomerLoginData({
            ...customerLoginData, isCustomer: true
        })
    }
    if (!errorMessage) {
        return (
            <LoginForm
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                isCustomer={customerLoginData.isCustomer}
                handleCustomerChange={handleCustomerChange}
                handleProviderChange={handleProviderChange}
            />
        );
    } else {
        return (
            <>
                <LoginForm
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    isCustomer={customerLoginData.isCustomer}
                    handleCustomerChange={handleCustomerChange}
                    handleProviderChange={handleProviderChange}
                />
                <h1 className={styles.error_message} id="error-message">{errorMessage}</h1>
            </>
        )
    }
}