import { Link } from "react-router-dom";
import Nav from "../components/Nav";

const ErrorPage = () => {
  return (
    <>
    <Nav/>
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <h1 className="text-6xl font-serif text-black mb-4">PAGE NOT FOUND</h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you were looking for could not be found. It might have been
        removed, renamed, or did not exist in the first place.
      </p>
      <Link
        to="/"
        className="bg-black text-white px-6 py-3 font-medium"
      >
        GO TO HOME PAGE
      </Link>
    </div></>
  );
};

export default ErrorPage;
