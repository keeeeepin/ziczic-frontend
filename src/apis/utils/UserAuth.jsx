import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useToast } from "@chakra-ui/react";

const UserAuth = () => {

const navigate = useNavigate(); 
const { token } = localStorage.getItem('token');
const toast = useToast(); 

useEffect(() => {
    if (!token) {
        toast({
            title: '로그인을 해주세요',
            status: 'info', 
            duration: 3000
        });
        navigate('/login');
    }
}, [token, navigate, toast]);

    return token ? children : null; 
}

export default UserAuth;