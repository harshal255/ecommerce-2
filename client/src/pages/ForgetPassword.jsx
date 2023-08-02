import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


function ForgetPassword() {
    const [email, setEmail] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/v1/password/forgot', {
                email,
            });
            console.log(response);
            // console.log('Forget Password mail sent successful');
        } catch (error) {
            console.error('Failed:', error);
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
                <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
                    <Typography color="gray" className="mt-5 font-bold mx-auto">
                        RESET YOUR PASSWORD
                    </Typography>
                    <Typography color="gray" className="mt-5 font-normal mx-auto">
                        Lost your password? Please enter your email address. You will receive a link to create a new password via email.
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-3 mb-4 flex flex-col gap-6  items-center justify-center">
                            <Input type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                size="lg" color="pink" label={
                                    <>
                                        Email <span className="text-red-500">*</span>
                                    </>
                                } />
                        </div>
                        <Button className="mt-6" color="pink" type="submit" fullWidth>
                            RESET PASSWORD
                        </Button>
                    </form>
                    <Typography color="gray" className="mt-2 mx-auto font-normal">
                        <Link to="/login" className=" underline font-medium transition-colors hover:text-pink-700">
                            Cancle
                        </Link>
                    </Typography>
                </div>
            </>
        </Card>
    )
}

export default ForgetPassword
