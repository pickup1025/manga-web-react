import React from "react";
import profileImage from "../assets/profile.jpg";

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4 ms-5">Contact</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-40 h-40 rounded-full mr-4 object-cover"
          />
          <div>
            <h2 className="text-xl font-bold">พีรพัฒน์ ดำรงนิเวศวิทย์</h2>
            <h3 className="text-gray-500">สาขา: เทคโนโลยีสารสนเทศ</h3>
            <h3 className="text-gray-500">Web</h3>
            <h3 className="text-gray-500">Email: 641413008@crru.ac.th</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
