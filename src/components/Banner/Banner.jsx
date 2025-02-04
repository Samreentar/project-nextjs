"use client";

import { useEffect, useState } from "react";
import Dropdownone from "./Dropdownone";
import Dropdowntwo from "./Dropdowntwo";

const Banner = () => {
    // State to store the average rating
    const [rating, setRating] = useState(0);

    // Fetch reviews and calculate the average rating
    const fetchReviews = async () => {
        try {
            // Fetch reviews from the API endpoint
            const response = await fetch("http://localhost:8080/api/reviews/getreviews"); // Update with your API endpoint
            const reviews = await response.json();

            if (reviews && reviews.length > 0) {
                // Sum up all ratings and calculate the average
                const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
                const averageRating = totalRating / reviews.length;
                setRating(averageRating); // Update the rating state
            }
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        }
    };

    // Fetch reviews when the component mounts
    useEffect(() => {
        fetchReviews();
    }, []);

    // Function to render stars dynamically based on the average rating
    const renderStars = (rating) => {
        const roundedRating = Math.round(rating); // Round the rating to the nearest integer
        return (
            <>
                {/* Render stars based on the rounded rating */}
                {Array(roundedRating)
                    .fill(0)
                    .map((_, i) => (
                        <img
                            key={`star-${i}`}
                            src="/assets/banner/Stars.svg" // Full star icon path
                            alt="Star"
                            className="inline-block h-5 w-5"
                        />
                    ))}
            </>
        );
    };
    

    return (
        <main className="banner-image" id="home">
            <div className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-5xl pt-16 sm:pt-40 sm:pb-24">
                    <div className="text-center">
                        {/* Main heading */}
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-75px md:4px">
                            Your Exams, <br /> Our Smart Solutions
                        </h1>
                        {/* Subheading */}
                        <p className="mt-6 text-lg leading-8 text-black">
                            Experience the ease of automated grading and effortless online exam administration
                        </p>
                        {/* Rating and user avatars */}
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <div className="hidden sm:block -space-x-2 overflow-hidden">
                                {/* Add avatar images */}
                                <img
                                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                                <img
                                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                                <img
                                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                    alt=""
                                />
                                <img
                                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                                <img
                                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                            </div>
                            {/* Rating display */}
                            <div className="bannerBorder sm:pl-8">
    <div className="flex justify-center sm:justify-start items-center">
        <h3 className="text-2xl font-semibold mr-2">{rating.toFixed(1)}</h3>
        <div className="flex">{renderStars(rating)}</div>
    </div>
    <div>
        <h3 className="text-sm">Based on user reviews.</h3>
    </div>
</div>

                        </div>
                    </div>

                    {/* Dropdown buttons and action button */}
                    <div className="mx-auto max-w-4xl mt-24 pt-6 pb-8 px-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg boxshadow">
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8">
                            <div className="col-span-3">
                                <Dropdownone />
                            </div>
                            <div className="col-span-3">
                                <Dropdowntwo />
                            </div>
                            <div className="col-span-3 sm:col-span-2 mt-2">
                                <button className="bg-purple w-full hover:bg-pruple text-white font-bold py-4 px-3 rounded">
                                    Start
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Banner;
