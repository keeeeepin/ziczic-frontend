import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const CheckLogingState = ({children}) => {
    const navigate = useNavigate(); 
    const { token } = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    return !token ? children : null; 
};

export default CheckLogingState; 