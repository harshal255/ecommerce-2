import { useEffect, useState } from "react";
import axios from "axios";
import { PencilIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    CardFooter,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { AiFillDelete } from "react-icons/ai";
const AdminUsers = () => {

    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);
    const [newName, setNewName] = useState("");
    const [newMail, setNewMail] = useState("");
    const [newRole, setNewRole] = useState("");

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen((cur) => !cur);

    const showUsers = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/admin/users", {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.success) {
                const usersdata = response.data.users;
                setUsers(usersdata);
                console.log(users);
            } else {
                alert("Failed to fetch user details");
                console.log(response.data.message);
            }
        } catch (error) {
            alert(error.response.data.message);
            console.error("Failed to fetch user details:", error);
        }
    }

    useEffect(()=>{
       showUsers();
    },[]);
    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    const handleProfileUpdate = async () => {
        try {
            const response = await axios.put(
                `http://localhost:4000/api/v1/admin/user/${selectedUser._id}`,
                {
                    name: newName,
                    email: newMail,
                    role: newRole,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(response);
            alert("Profile updated successfully!");
            // Update the users list with the updated profile data
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === selectedUser._id
                        ? { ...user, name: newName, email: newMail, role: newRole }
                        : user
                )
            );
            handleOpen();
        } catch (error) {
            alert("Failed to update profile: " + error.response.data.message);
            console.error("Failed to update profile:", error);
        }
    };


    const handleUserDelete = async (userId) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/v1/admin/user/${userId}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
            console.log(response);
            alert('User deleted successfully!');
        } catch (error) {
            alert('Failed to delete user: ' + error.response.data.message);
            console.error('Failed to delete user:', error);
        }
    };
  
    return (
        <>
            <div className="users">
                <Card className="h-full w-full">
                    {/* <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-8 flex items-center justify-between gap-8">
                            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                <Button variant="outlined" color="blue-gray" size="sm" onClick={showUsers}>
                                    view all
                                </Button>
                            </div>
                        </div>
                    </CardHeader> */}
                    <CardBody className="overflow-scroll px-0">
                        <div className="overflow-x-auto">
                            <table className="mt-4 w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                            >
                                                Members
                                            </Typography>
                                        </th>
                                        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 hidden md:table-cell">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                            >
                                                Role
                                            </Typography>
                                        </th>
                                        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                            >
                                                Update
                                            </Typography>
                                        </th>
                                        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                            >
                                                Delete
                                            </Typography>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(({ _id, name, email, role }) => {
                                        return (
                                            <tr key={_id}>
                                                <td className="p-4 border-b border-blue-gray-50">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex flex-col">
                                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                                {name}
                                                            </Typography>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal opacity-70 hidden md:block"
                                                            >
                                                                {email}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 border-b border-blue-gray-50 hidden md:table-cell">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {role}
                                                    </Typography>
                                                </td>
                                                <td className="p-4 border-b border-blue-gray-50">
                                                    <Tooltip content="Edit User">
                                                        <IconButton variant="text" color="blue-gray" onClick={() => { handleSelectUser({ _id, name, email, role }); handleOpen(); }}>
                                                            <PencilIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                                <td className="p-4 border-b border-blue-gray-50">
                                                    <Tooltip content="Delete User">
                                                        <IconButton variant="text" color="blue-gray">
                                                            <AiFillDelete className="h-4 w-4" onClick={() => { handleUserDelete(_id) }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            Page 1 of 10
                        </Typography>
                        <div className="flex gap-2">
                            <Button variant="outlined" color="blue-gray" size="sm">
                                Previous
                            </Button>
                            <Button variant="outlined" color="blue-gray" size="sm">
                                Next
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
            {
                selectedUser && (
                    <Dialog size={"xl"} open={open} handler={handleOpen} className="bg-white shadow-none mx-0 h-full">
                        <div className="">
                            <div className="flex items-center justify-between">
                                <DialogHeader variant="h5" color="pink-gray">
                                    User Details
                                </DialogHeader>
                                <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpen} />
                            </div>
                            <DialogBody divider>
                                <div className="flex flex-col gap-3">
                                    <Typography variant="h6" color="blue-gray">
                                        Details
                                    </Typography>
                                    <Input color="pink" label="Name" value={selectedUser ? selectedUser.name : ''} readOnly />
                                    <Input color="pink" label="Mail" value={selectedUser ? selectedUser.email : ''} readOnly />
                                    <Input color="pink" label="Role" value={selectedUser ? selectedUser.role : ''} readOnly />
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Typography variant="h6" color="blue-gray">
                                        Update
                                    </Typography>
                                    <Input color="pink" label="New Name" onChange={(e) => { setNewName(e.target.value) }} />
                                    <Input color="pink" label="New Mail" onChange={(e) => { setNewMail(e.target.value) }} />
                                    <Input color="pink" label="New Role" onChange={(e) => { setNewRole(e.target.value) }} />
                                </div>
                            </DialogBody>

                            <DialogFooter className="space-x-2">
                                <button className="flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none rounded-full hover:bg-pink-700 duration-300 hover:translate-y-2 my-2" onClick={handleProfileUpdate}>Update Profile</button>
                            </DialogFooter>
                        </div>
                    </Dialog>
                )
            }
        </>
    )
}
export default AdminUsers