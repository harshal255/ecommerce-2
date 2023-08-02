/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from "react";
import axios from "axios";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Textarea,
    Typography,
    Rating
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { AiOutlineDelete } from "react-icons/ai";

const CustomerReview = ({ pid }) => {
    const [rated, setRated] = useState(5);
    const [comment, setComment] = useState('');
    const [open, setOpen] = useState(false);
    const [reviews, setReviews] = useState([]);

    const handleOpen = () => setOpen((cur) => !cur);
    const [userRole,setUserRole] = useState("");

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4000/api/v1/reviews?id=${pid}`
                );
                setReviews(response.data.reviews);
                // Calculate the average rating from the fetched reviews
                const totalRating = response.data.reviews.reduce((acc, review) => acc + review.rating, 0);
                const averageRating = totalRating / response.data.reviews.length;
                setRated(averageRating);


            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            }
        };
        setUserRole(localStorage.getItem('role'));
        fetchReviews();

    }, []); //productId

    const handleReview = async () => {
        try {
            const reviewData = {
                rating: rated,
                comment: comment,
                productId: pid,
            };

            const response = await axios.put('http://localhost:4000/api/v1/review', reviewData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            alert("Rating submitted");
        } catch (error) {
            console.error('Failed to submit review:', error);
            alert('Failed to submit review: ' + error.response.data.message);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            const response = await axios.delete(
                `http://localhost:4000/api/v1/reviews?productId=${pid}&id=${reviewId}`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // Remove the deleted review from the reviews state
            setReviews((prevReviews) =>
                prevReviews.filter((review) => review._id !== reviewId)
            );

            console.log(response.data);
            alert("Review deleted successfully.");
        } catch (error) {
            console.error("Failed to delete review:", error);
            alert("Failed to delete review: " + error.response?.data?.message);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center gap-2 m-auto">

                <h4 className="font-bold text-slate-700">Customer reviews</h4>

                <div className="flex flex-col md:flex-row gap-10">
                    <div className=" w-full flex flex-col justify-center items-center">
                        <div className="flex items-center gap-2">
                            <Rating value={reviews.rating || 0} readonly />
                            <Typography color="pink-gray" className="font-medium">
                                {rated} Rated
                            </Typography>

                        </div>
                        <button className="flex text-white bg-yellow-700 border-0 py-2 px-6 focus:outline-none rounded-full hover:bg-yellow-800 duration-300 hover:translate-y-2 my-2" onClick={handleOpen}>Write Review</button>
                    </div>

                    <Dialog
                        size={"xl"}
                        open={open}
                        handler={handleOpen}
                        className="bg-white shadow-none mx-0"

                    >
                        <div className="">
                            <div className="flex items-center justify-between">
                                <DialogHeader variant="h5" color="blue-gray">
                                    Rate us
                                </DialogHeader>
                                <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpen} />
                            </div>
                            <div className="flex justify-evenly gap-2 items-center">
                                <div className='border bg-white px-2 relative '>
                                    <div className="badge absolute -top-2 -right-2 bg-gray-600 h-6 w-6">1</div>
                                    {/* <img src={product.images[0].url} alt="img" className='h-14 w-16' /> */}
                                </div>
                                <div className="flex flex-col">
                                    <span className='text-sm'>this is sample name</span>
                                    <Rating value={5} onChange={(value) => setRated(value)} readonly />
                                </div>

                            </div>
                            <DialogBody divider>
                                <div className="flex items-center gap-2 my-4">
                                    <Typography color="pink-gray" className="font-medium">
                                        {rated} Rated
                                    </Typography>
                                    <Rating value={5} onChange={(value) => setRated(value)} />
                                </div>
                                <div className="grid gap-6">
                                    <Textarea label="Review Content" onChange={(e) => { setComment(e.target.value) }} />
                                </div>
                            </DialogBody>
                            <DialogFooter className="space-x-2">

                                <button className="flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none rounded-full hover:bg-pink-700 duration-300 hover:translate-y-2 my-2" onClick={handleOpen}>Close</button>
                                <button className="flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none rounded-full hover:bg-pink-700 duration-300 hover:translate-y-2 my-2" onClick={handleReview}>Submit</button>

                            </DialogFooter>
                        </div>
                    </Dialog>


                    <div className="flex w-full flex-col gap-4 pt-6">
                        <span className="flex w-full items-center gap-2">
                            <label
                                id="p03e-label"
                                htmlFor="p03e"
                                className="mb-0 w-9 shrink-0 text-center text-xs text-slate-500"
                            >
                                5 star
                            </label>
                            <progress
                                aria-labelledby="p03e-label"
                                id="p03e"
                                max="100"
                                value="75"
                                className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400"
                            >
                                75%
                            </progress>
                            <span className="w-9 text-xs font-bold text-slate-700">112 </span>
                        </span>
                        <span className="flex w-full items-center gap-2">
                            <label
                                id="p03e-label"
                                htmlFor="p03e"
                                className="mb-0 w-9 shrink-0 text-center text-xs text-slate-500"
                            >
                                4 star
                            </label>
                            <progress
                                aria-labelledby="p03e-label"
                                id="p03e"
                                max="100"
                                value="28"
                                className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400"
                            >
                                75%
                            </progress>
                            <span className="w-9 text-xs font-bold text-slate-700">17 </span>
                        </span>
                        <span className="flex w-full items-center gap-2">
                            <label
                                id="p03e-label"
                                htmlFor="p03e"
                                className="mb-0 w-9 shrink-0 text-center text-xs text-slate-500"
                            >
                                3 star
                            </label>
                            <progress
                                aria-labelledby="p03e-label"
                                id="p03e"
                                max="100"
                                value="18"
                                className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400"
                            >
                                75%
                            </progress>
                            <span className="w-9 text-xs font-bold text-slate-700">12 </span>
                        </span>
                        <span className="flex w-full items-center gap-2">
                            <label
                                id="p03e-label"
                                htmlFor="p03e"
                                className="mb-0 w-9 shrink-0 text-center text-xs text-slate-500"
                            >
                                2 star
                            </label>
                            <progress
                                aria-labelledby="p03e-label"
                                id="p03e"
                                max="100"
                                value="8"
                                className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400"
                            >
                                75%
                            </progress>
                            <span className="w-9 text-xs font-bold text-slate-700">2 </span>
                        </span>
                        <span className="flex w-full items-center gap-2">
                            <label
                                id="p03e-label"
                                htmlFor="p03e"
                                className="mb-0 w-9 shrink-0 text-center text-xs text-slate-500"
                            >
                                1 star
                            </label>
                            <progress
                                aria-labelledby="p03e-label"
                                id="p03e"
                                max="100"
                                value="10"
                                className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400"
                            >
                                75%
                            </progress>
                            <span className="w-9 text-xs font-bold text-slate-700">4 </span>
                        </span>
                    </div>

                </div>


            </div>
            <div>
                {reviews.map((review) => (
                    <article className="lg:w-1/2 m-auto" key={review._id}>
                        <div className="flex items-center mb-4 space-x-4 ">
                            <div className="space-y-1 font-medium dark:text-white">
                                <p>
                                    {review.name}{" "}
                                </p>
                            </div>
                        </div>
                        <Rating value={reviews.rating || 0 } readonly />
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            {review.comment}
                        </p>

                        {/* Conditionally render delete icon for admin user */}
                        {userRole === "admin" && (
                            <button
                                className="text-pink-500 hover:text-pink-700"
                                onClick={() => handleDeleteReview(review._id)}
                            >
                                <AiOutlineDelete />
                            </button>
                        )}
                    </article>
                ))}
            </div>
        </>
    )
}

export default CustomerReview