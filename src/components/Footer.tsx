import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="container max-w-[1000px] m-auto mt-4 mb-1">
      <div className="flex justify-between">
        <div className=" w-5/12">
          <b>Blog Site</b>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum
            animi, dolor a maxime numquam dolore?
          </p>
        </div>
        <div className=" w-3/12">
          <ul>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href="#">Contact Us</Link>
            </li>
            <li>
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="#">Log In</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
