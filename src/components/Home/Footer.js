import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#091F5B] dark:bg-gray-800 bottom-0 w-full">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            PaulTo Design
          </a>
          . All Rights Reserved.
        </span>
        <div>
          <a className="text-white" href="https://tovanhuong.id.vn/">
            https://tovanhuong.id.vn/
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
