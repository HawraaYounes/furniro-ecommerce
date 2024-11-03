import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Button from "../components/Button";

const NotFoundError = () => {
  return (
    <>
   
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <h1 className="text-3xl md:text-6xl font-abhaya font-semibold text-black mb-4">PAGE NOT FOUND</h1>
      <p className=" md:text-xl text-gray-600 mb-8 font-poppins w-1/2">
        The page you were looking for could not be found. It might have been
        removed, renamed, or did not exist in the first place.
      </p>
      
      <Link to="/">
          <Button label="GO TO HOME PAGE" /> 
        </Link>
    </div></>
  );
};

export default NotFoundError;
