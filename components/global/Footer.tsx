import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex justify-center py-5 bg-slate-800 mt-12">
      <div className="md:flex gap-1">
        <p className="text-center">@ OpenDiary 2024 |</p>
        <div className="flex">
          <Link href="https://www.instagram.com/fauzanaslam/?next=%2F">
            <p className="hover:text-primary ease-in-out duration-100">
              FauzanAslam
            </p>
          </Link>
           X mang Dea & OpenDiary Dev Team. All rights reversed
          <p>.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
