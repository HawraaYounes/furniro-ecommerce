import React from "react";
import { useRouteError } from "react-router-dom";
import NotFoundError from "./NotFoundError";
import Nav from "../components/Nav";

const ErrorPage = () => {
  const error = useRouteError();
  let content;
  // Check for specific status or provide a generic error message
  if (error.status === 404) {
    content = <NotFoundError />;
  } else {
    content = (
      <div>
        <p>An error occurred:</p>
        <p>{error.message || "Something went wrong!"}</p>
      </div>
    );
  }

  return (
    <>
      <Nav />
      {content}
    </>
  );
};

export default ErrorPage;
