import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#091F5B] dark:bg-gray-800 w-full">
      <div className="w-full mx-auto max-w-screen-xl p-4 text-center">
        <span className="text-sm text-white sm:text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            PaulTo Design
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
