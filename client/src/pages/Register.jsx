import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(name, email, password);
            const response = await axios.post('http://localhost:4000/api/v1/register', {
                name,
                email,
                password,
            });
            alert('Registration successful');
            console.log(response);
            navigate('/login');

        } catch (error) {
            alert(error.response.data.message);
            console.error('Registration failed:', error);
        }
    };
    return (
        <Card color="transparent" shadow={false}>
            <div className="bg-gray-200 py-4">
                <Typography variant="h4" color="white" className="px-4 text-center">
                    Register
                </Typography>
            </div>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4 flex flex-col gap-6  items-center justify-center">
                    <Input type="text" size="lg" value={name}
                        onChange={(e) => setName(e.target.value)}
                        color="pink" label="Name" />
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
                <Button className="mt-6" color="pink" type="submit" fullWidth>
                    Register
                </Button>
            </form>
            <Typography color="gray" className="mt-4 mx-auto font-normal">
                <Link to="/login" className="underline font-medium text-black-500 transition-colors hover:text-pink-700">
                    Already have an account? Sign In
                </Link>
            </Typography>
        </Card>
    );
}
