import React, { useState, useRef, useEffect, useContext } from "react";
import Cookies from 'js-cookie';
import AuthContext from "../AuthContext";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/solid";


function UserDetails() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen((cur) => !cur);

    const fileInputRef = useRef(null);

    const { userDetails, fetchUserProfile } = useContext(AuthContext);

    const handleImageClick = () => {
        fileInputRef.current.click(); // Simulate a click on the file input element
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const [newname, setNewName] = useState("");
    const [newmail, setNewMail] = useState("");
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [newRePass, setNewRePass] = useState("");

    const handleProfileUpdate = async () => {
        try {
            console.log(newname);
            console.log(newmail);
            const response = await axios.put(
                'http://localhost:4000/api/v1/me/update',
                {
                    name: newname,
                    email: newmail
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // If the update is successful, update the userDetails state
            console.log(response);
            alert('Name updated successfully!');
            handleOpen();
        } catch (error) {
            alert('Failed to update name: ' + error.response.data.message);
            console.error('Failed to update name:', error);
        }
    };
    const handlePasswordUpdate = async () => {
        try {
            console.log(oldPass);
            console.log(newRePass);
            const response = await axios.put(
                'http://localhost:4000/api/v1/password/update',
                {
                    oldPassword: oldPass,
                    newPassword: newPass,
                    confirmPassword: newRePass
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // If the update is successful, update the userDetails state
            console.log(response);
            alert('Password updated successfully!');

            const newToken = response.data.token;
            Cookies.set('tokenjwt', newToken);

            handleOpen();
        } catch (error) {
            alert('Failed to update password: ' + error.response.data.message);
            console.error('Failed to update password:', error);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result; // Get the data URL of the selected file
            // Handle the selected image URL as needed
        };
        reader.readAsDataURL(file); // Read the selected file as a data URL
    };

    return (
        <>
            <section className="container px-5 py-10 mx-auto border justify-center items-center">
                <div className="flex flex-wrap">
                    <div className="p-4 md:w-1/2 justify-center items-center">
                        <div className="h-full py-5 lg:w-[50rem] flex flex-col items-center text-center">
                            <img alt="team" className="flex-shrink-0  w-[150px] h-[150px] object-cover object-center my-4 rounded-full" src="https://dummyimage.com/200x200" />
                            <div className="w-full flex flex-col gap-3 text-start">
                                <div className="title-font font-medium text-lg text-gray-900"><b>User Name :</b>{userDetails.name}</div>
                                <div className="title-font font-medium text-lg text-gray-900"><b>User Email :</b>{userDetails.email}</div>
                            </div>
                            <button className="flex text-white bg-pink-700 border-0 py-2 px-6 focus:outline-none rounded-full hover:bg-pink-800 duration-300 hover:translate-y-2 my-2" onClick={handleOpen}>Update Your Info</button>
                        </div>
                    </div>

                </div>
            </section>
            <Dialog
                size={"xl"}
                open={open}
                handler={handleOpen}
                className="bg-white shadow-none mx-0"

            >
                <div className="">
                    <div className="flex items-center justify-between">
                        <DialogHeader variant="h5" color="pink-gray">
                            Profile
                        </DialogHeader>
                        <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpen} />
                    </div>
                    <div>
                        <img
                            alt="team"
                            className="flex-shrink-0 my-4 w-[100px] h-[100px] object-cover object-center mb-4 rounded-full m-auto hover:cursor-pointer"
                            src="https://dummyimage.com/200x200"
                            onClick={handleImageClick} // Call the handleImageClick function when the image is clicked
                        />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }} // Hide the file input element
                            onChange={handleFileChange} // Call the handleFileChange function when a file is selected
                        />
                    </div>

                    <DialogBody divider>
                        <div className="flex flex-col gap-3">
                            <Input color="pink" label="User Name" onChange={(e) => { setNewName(e.target.value) }} />
                            <Input color="pink" label="User Mail" onChange={(e) => { setNewMail(e.target.value) }} />
                            <Input color="pink" label="User Old Password" onChange={(e) => { setOldPass(e.target.value) }} />
                            <Input color="pink" label="User new Password" onChange={(e) => { setNewPass(e.target.value) }} />
                            <Input color="pink" label="Re-enter new Password" onChange={(e) => { setNewRePass(e.target.value) }} />
                        </div>
                    </DialogBody>
                    <DialogFooter className="space-x-2">
                        <button className="flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none rounded-full hover:bg-pink-700 duration-300 hover:translate-y-2 my-2" onClick={handleProfileUpdate}>Update Profile</button>
                        <button className="flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none rounded-full hover:bg-pink-700 duration-300 hover:translate-y-2 my-2" onClick={handlePasswordUpdate}>Update Password</button>
                    </DialogFooter>
                </div>
            </Dialog>
        </>

    )
}

export default UserDetails;