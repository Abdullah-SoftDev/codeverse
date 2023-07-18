'use client'
import Link from "next/link";
import React, { useState } from "react";

const categories = [
  "Backend",
  "Full-Stack",
  "Mobile",
  "UI/UX",
  "Game Dev",
  "DevOps",
  "Data Science",
  "Machine Learning",
  "Cybersecurity",
  "Blockchain",
  "E-Commerce",
  "Chatbots",
];

const Menubar = () => {
  const [activeCategory, setActiveCategory] = useState("");

  const handleClick = (category:string) => {
    setActiveCategory(category);
  };

  return (
    <div className="mx-auto max-w-5xl flex py-4 text-xl space-x-4 overflow-x-auto">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded-md cursor-pointer hover:text-pink-500 w-full whitespace-nowrap scrollbar-hide focus:outline-none ${
            activeCategory === category && "bg-gray-100" 
          }`}
          onClick={() => handleClick(category)}
        >
          <Link href={``}>
            {category}
          </Link>
        </button>
      ))}
    </div>
  );
};

export default Menubar;
