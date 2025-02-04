"use client";  // Required for Next.js to handle client-side functionality
import { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/Banner/Banner";
import Companies from "../components/Companies/Companies";
import Tabs from "../components/Courses/Courses";
import Mentor from "../components/Mentor/Mentor";
import Teachers from "../components/Teachersreview/Teachersreview";
import Newsletter from "../components/Newsletter/Newsletter";
import LandingNavbar from "@/components/LNavbar/LandingNavbar";
import Pricing from "@/components/pricing";
import MyComponent from "../components/MyComponents";  // Import the MyComponent

import "./globals.css";

export default function Home() {
  // State to store the data from the API
  const [apiData, setApiData] = useState(null);

  // useEffect to make the API call when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Backend URL changed to 3000 port
        const response = await axios.get("http://localhost:3000"); // Backend URL
        setApiData(response.data); // Store the API data in state
        console.log(response.data); // Optional: Check the response in the console
      } catch (error) {
        console.error("Error fetching data:", error); // Handle any errors
      }
    };

    fetchData();
  }, []); // Empty array ensures this runs only once after the component mounts

  return (
    <main>
      <Banner />
      <Companies />
      <Tabs />
      <Mentor />
      <Teachers />
      <Pricing />
      <Newsletter />
      <LandingNavbar />

      {/* Add the new component */}
      <MyComponent /> {/* This is where you add the exam submission functionality */}
    </main>
  );
}
