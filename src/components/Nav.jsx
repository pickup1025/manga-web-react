import { Link } from "react-router-dom";
import profileImage from "../assets/images.png";
export default function Nav() {
  return (
    <nav className="bg-red-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
      
          
        <Link to="/" className="text-white text-2xl font-bold flex ">
        <img
            src={profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-4 object-cover"
          />
          มังงะยอดนิยม
        </Link>

        <ul className="flex space-x-4">
         
          <li>
            <Link
              to="contact"
              className="text-white hover:text-gray-200 transition duration-300 font-bold"
            >
              CONTACT
            </Link>
          </li>
          <li>
            <Link
              to="Login"
              className="text-white hover:text-gray-200 transition duration-300 font-bold"
            >
              จัดการข้อมูล
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
