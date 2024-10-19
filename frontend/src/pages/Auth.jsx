import React, { useState } from "react";
import { json, redirect } from "react-router-dom";
import Nav from "../components/Nav";
import axios from "axios";
import Alert from "../components/Alert";
import AuthForm from "../sections/auth/AuthForm"

const Auth = () => {
  const [flashMessage, setFlashMessage] = useState({ message: "", type: "" });

  return (
    <>
      <Nav />
      {flashMessage.message && (
        <Alert type={flashMessage.type} message={flashMessage.message} />
      )}
      <AuthForm setFlashMessage={setFlashMessage} />
    </>
  );
};

export default Auth;

export async function action({ request }) {
  const data = await request.formData();
  const searchParams = new URL(request.url).searchParams;

  const mode = searchParams.get("mode") || "signup";
  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Invalid mode!" }, { status: 422 });
  }

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  if (mode === "signup") {
    const name = data.get("name");
    const confirmPassword = data.get("confirmPassword");

    if (authData.password !== confirmPassword) {
      return json({ message: "Passwords do not match!" }, { status: 422 });
    }
    authData.name = name;
  }

  try {
    const response = await axios.post(
      `http://localhost:3000/auth/${mode}`,
      authData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Return success message and redirect after login/signup
    return redirect("/");
  } catch (error) {
    if (error.response) {
      return json(
        { message: error.response.data.message || "An error occurred!" },
        { status: error.response.status }
      );
    }
    return json({ message: "An unexpected error occurred!" }, { status: 500 });
  }
}
