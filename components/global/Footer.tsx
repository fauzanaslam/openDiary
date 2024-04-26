import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex justify-center py-5 bg-slate-800">
      <div className="flex gap-1">
        @ OpenDiary 2024 |
        <Link href="https://www.instagram.com/fauzanaslam/?next=%2F">
          <p className="hover:text-primary ease-in-out duration-100">
            FauzanAslam
          </p>
        </Link>
        . All rights reversed
      </div>
    </div>
  );
};

export default Footer;
