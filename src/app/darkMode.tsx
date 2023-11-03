"use client";
import { useState, useEffect } from "react";
import sun from "../../public/sun.png";
import moon from "../../public/moon.png";
import Image from "next/image";
import "./globals.css";
const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof (window !== undefined)) {
      const isDarkMode = localStorage.getItem("darkMode") === "true";
      setDarkMode(isDarkMode);
    }

    if (darkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const updatedDarkMode = !darkMode;
    setDarkMode(updatedDarkMode);
    localStorage.setItem("darkMode", String(updatedDarkMode));
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      {" "}
      <div className="text-black dark:text-white" onClick={toggleDarkMode}>
        {/* {darkMode ? <div className=""></div> : "light"} */}
        <div className=" flex gap-1 mt-1 w-8 rounded-3xl justify-evenly relative bg-black dark:bg-white">
          <Image src={moon} width={11} height={11} alt="sun " />

          <div
            className={` ${
              darkMode ? "right-0" : "left-0"
            } w-3 h-3 darkModeBtn dark:bg-gray-200 bg-gray-400 mx-1 rounded-full absolute`}
          ></div>
          <Image src={sun} width={12} height={15} alt="sun " />
        </div>
      </div>
    </>
  );
};

export default DarkModeToggle;
