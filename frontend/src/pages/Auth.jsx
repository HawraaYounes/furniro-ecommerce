import { json, redirect } from "react-router-dom";
import Nav from "../components/Nav";
import AuthForm from "../sections/auth/AuthForm";
import axios from "axios";

const Auth = () => {
  return (
    <>
      <Nav />
      <AuthForm />
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

  // Extract common fields
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
    const response = await axios.post(`http://localhost:3000/auth/${mode}`, authData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data)

    // Redirect after successful login/signup
    return redirect('/');
  } catch (error) {
    if (error.response) {
      alert(error.response.data.message)
      // Handle specific errors
      
    }
    // Handle generic errors
    return json({ message: "An unexpected error occurred!" }, { status: 500 });
  }
}
