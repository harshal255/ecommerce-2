import React, { useState, useContext } from "react";
import Cookies from 'js-cookie';
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

export default function Login() {

    const { setIsLoggedIn } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/v1/login', {
                email,
                password,
            });
            // console.log(response);

            // Set the refresh token in the cookie
            alert("Log In Successfull");
            localStorage.setItem("role",response.data.user.role);
            const Token = response.data.token;
            Cookies.set('tokenjwt', Token);

            if (response.data.user.role === 'admin') {
                navigate('/admin');
                window.location.href = '/admin';
            } else {
                navigate('/');
            }

            setIsLoggedIn(true); // Update isLoggedIn state in the Navbar component
        } catch (error) {
            alert(error.response.data.message);
            console.error('Login failed:', error);
        }
    };

    return (
        <Card color="transparent" shadow={false}>
            <div className="bg-gray-200 py-4">
                <Typography variant="h4" color="white" className="px-4 text-center">
                    LOGIN
                </Typography>
            </div>
            <>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col gap-6  items-center justify-center">
                        <Input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            size="lg" color="pink" label={
                                <>
                                    Email <span className="text-red-500">*</span>
                                </>
                            } />
                        <Input
                            size="lg"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            color="pink"
                            label={
                                <>
                                    Password <span className="text-red-500">*</span>
                                </>
                            }
                        />
                    </div>
                    <Typography color="gray" className="mt-2 mx-auto font-normal">
                        <Link to="/recover" className=" underline font-medium transition-colors hover:text-pink-700">
                            Forgot your password?
                        </Link>
                    </Typography>
                    <Button className="mt-6" color="pink" type="submit" fullWidth>
                        SIGN IN
                    </Button>
                </form>
                <Typography color="gray" className="mt-4 mx-auto font-normal">
                    <Link to="/register" className=" underline font-medium transition-colors hover:text-pink-700">
                        New customer? Create your account
                    </Link>
                </Typography>
            </>
        </Card>
    );
}
