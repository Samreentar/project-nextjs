"use client";
import Slider from "react-slick";
import React, { useState, useEffect } from "react";

// Component for dynamic reviews with ratings
export default function MultipleItems() {
  const [reviews, setReviews] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    profession: "",
    name: "",
    rating: "",
    detail: "",
  });

  // Fetch reviews from the backend
  useEffect(() => {
    fetch("http://localhost:8080/api/reviews/getreviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true, dots: true },
      },
      {
        breakpoint: 800,
        settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: true },
      },
    ],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.profession || !formData.rating || !formData.detail) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    // Submit review to the backend
    fetch("http://localhost:8080/api/reviews/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newReview) => {
        setReviews((prev) => [...prev, newReview]);
        setFormData({ profession: "", name: "", rating: "", detail: "" });
        setFormVisible(false);
      })
      .catch((err) => console.error("Error submitting review:", err));
  };

  return (
    <div id="testimonial-section" className="bg-bgpink">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-64 sm:pt-32 lg:max-w-7xl lg:px-8">
        <div className="sm:flex justify-between items-center pb-6">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 my-4">
            What Our Happy <br /> Clients Say
          </h2>
          <div>
            <button
              className="bg-transparent hover:bg-purple text-purple font-semibold hover:text-white py-3 px-4 border border-lightgrey hover:border-transparent rounded"
              onClick={() => setFormVisible(!formVisible)}
            >
              {formVisible ? "Close Review Form" : "Give Your Review"}
            </button>
          </div>
        </div>

        {formVisible && (
          <form className="bg-white p-6 rounded-lg mb-6" onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Profession:</label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Rating (1-5):</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
                min="1"
                max="5"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Review:</label>
              <textarea
                name="detail"
                value={formData.detail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
                rows="4"
                required
              />
            </div>
            <button type="submit" className="bg-purple text-white py-2 px-4 rounded-lg">
              Submit Review
            </button>
          </form>
        )}

        <Slider {...settings}>
  {reviews.map((item, i) => (
    <div key={i}>
    
      <div className="bg-white m-4 pt-8 px-12 pb-10 text-center rounded-lg">
      <img
                      src="/assets/students/user-1.jpg"
                      alt="gaby"
                      className="inline-block h-16 w-16 m-auto rounded-full ring-2 ring-white"
                    />
        <h3 className="text-sm pt-4 pb-2">{item.profession}</h3>
        <h4 className="text-2xl font-semibold pb-3">{item.name}</h4>
        <p className="text-lg font-medium leading-9">
          Rating: {"★".repeat(item.rating)}
        </p>
        <p className="text-lg font-medium leading-9">{item.detail}</p>
      </div>
    </div>
  ))}
</Slider>

      </div>
    </div>
  );
}
