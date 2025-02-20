import React, { useState, useEffect } from "react";
import { useActionData } from "react-router-dom";
import Alert from "../components/Alert";
import AuthForm from "../sections/auth/AuthForm";
import { json, redirect } from "react-router-dom";
import axios from "axios";
import { ALERT_TYPES, alertTypes } from "../constants";
import { API_BASE_URL } from "../constants/config";

const Auth = () => {
  const [flashMessage, setFlashMessage] = useState({
    message: "",
    description: "",
    type: "",
  });
  const actionData = useActionData(); // Get the error or message returned from the action

  // If there's an error message from the action, display it
  useEffect(() => {
    if (actionData?.message) {
      setFlashMessage({
        message: actionData.message,
        description: actionData.description,
        type: ALERT_TYPES.ERROR,
      });
    }
  }, [actionData]);

  return (
    <>
      {flashMessage.message && (
        <Alert
          type={flashMessage.type}
          message={flashMessage.message}
          description={flashMessage.description}
        />
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
    return json({ message: "Invalid mode!" }, { status: 422 });
  }

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  if (mode === "signup") {
    const name = data.get("name");
    const confirmPassword = data.get("confirmPassword");

    if (authData.password !== confirmPassword) {
      return json(
        {
          message: "OOps!",
          type: alertTypes.success,
          description:
            "Password and Confirm Password fields should be identical.",
        },
        { status: 422 }
      );
    }

    authData.name = name;
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/${mode}`,
      authData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // On successful login/signup, redirect to the home page
    return redirect("/");
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred!";
    

    // Return the error message to be handled by the component
    return json(
      { message: "OOps!", description: errorMessage , type:"warning"}
    );
  }
}
