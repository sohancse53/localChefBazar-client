import React from "react";
import { FaConnectdevelop, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import Logo from "../Logo/Logo";

import { CgLock } from "react-icons/cg";
import { CiClock1 } from "react-icons/ci";
import { HiGlobeAsiaAustralia } from "react-icons/hi2";
import { MdEmail, MdOutlineDeveloperMode } from "react-icons/md";
import { PiPhone } from "react-icons/pi";

const Footer = () => {
  return (
    <>
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
  {/* Contact Details */}
  <nav>
    <h6 className="footer-title">Contact Us</h6>
    <p className="flex items-center justify-center"> <HiGlobeAsiaAustralia size={25}/> Dhaka, Bangladesh</p>
    <p className="flex items-center justify-center"><MdEmail size={25}/> info@local_chef_bazar.com</p>
    <p className="flex items-center justify-center"> <PiPhone size={25}/> +88 01775194511</p>
  </nav>

  {/* Working Hours */}
  <nav>
    <h6 className="footer-title flex items-center justify-center"><CiClock1 size={25}/> Working Hours</h6>
    <p className="">Sunday – Thursday: 9:00 AM – 6:00 PM</p>
    <p className="">Saturday: 10:00 AM – 4:00 PM</p>
    <p className="">Friday: Closed</p>
  </nav>

  {/* Social Media Links */}
  <nav>
    <h6 className="footer-title">Follow Us</h6>
    <div className="flex gap-4">
      <a data-tip='twitter' className="tooltip" target="blank" aria-label="Twitter" href="https://twitter.com">
        <FaTwitter size={25}/>
      </a>
      <a  data-tip='Youtube' className="tooltip" target="blank" aria-label="YouTube" href="https://youtube.com">
       <FaYoutube size={25}/>
      </a>
      <a data-tip='Facebook' className="tooltip"   target="blank" aria-label="Facebook" href="https://www.facebook.com">
       <FaFacebook size={25}/>
      </a>
     
    </div>
  </nav>
</footer>

{/* Bottom Bar with Copyright */}
<footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
  <aside className="grid-flow-col items-center">
   <Logo/>
    <p>Local Chef Bazar © {new Date().getFullYear()}</p>
  </aside>
  <nav className="md:place-self-center md:justify-self-end">
    {/* <p>Providing customer service  2025</p> */}
   
    <a 
  className="tooltip font-semibold flex items-center gap-2" 
  data-tip="Contact Developer Shoyaif Rahman" 
  target="_blank" 
  rel="noopener noreferrer" 
  aria-label="developer" 
  href="https://www.facebook.com/sohan.000000000000000000000000"
>
  <FaConnectdevelop/>
  Developed By Md. Shoyaif Rahman
</a>
  </nav>
</footer>
    </>
  );
};

export default Footer;