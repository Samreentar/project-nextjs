// components/Pricing.tsx

import React from 'react';
import Link from 'next/link';

interface PricingOption {
  title: string;
  price: string;
  features: string[];
  payment_link: string;
}

const pricingOptions: PricingOption[] = [
  {
    title: 'Business Plan',
    price: '$69.99/month',
    features: ['AI-Powered Auto-Grading ', 'Customizable Exam Creation', 'Role based  ', 'Online Examination Management:'],
    payment_link: "https://buy.stripe.com/test_00g4ib9Ff0Xfh0cdQQ"
  },
  {
    title: 'Pro Plus Plan',
    price: '$199.99/month',
    features: ['AI-Powered Auto-Grading', 'Optical Character Recognition (OCR)', 'Customizable Exam Creation', 'Role based', 'User-Friendly Interface'],
    payment_link: "https://buy.stripe.com/test_9AQbKDdVvbBTfW8cMN"
  },
];

const Pricing: React.FC = () => {
  return (
    <div className="bg-gray-100 py-12 mb-36">
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Pricing</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Choose your plan
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Simple and transparent pricing plans to suit your needs.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {pricingOptions.map((option) => (
            <div
              key={option.title}
              className="bg-bgpurple py-8 px-6 text-white shadow rounded-lg overflow-hidden"
            >
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">{option.title}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">{option.price}</span>
                </div>
              </div>
              <div className="mt-6">
                <ul className="space-y-4">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
                <Link href={option.payment_link}>

                  <button className="mt-8 block w-full text-center bg-indigo-600 text-white bg-lamaYellow py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Pay Now
                  </button>



                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;

