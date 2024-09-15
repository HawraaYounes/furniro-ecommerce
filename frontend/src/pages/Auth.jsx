import { json, redirect } from "react-router-dom";
import Nav from "../components/Nav";
import AuthForm from "../sections/auth/AuthForm";

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

  const mode = searchParams.get("mode") || "login";
  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Invalid mode!" }, { status: 422 });
  }

  // Extract common fields
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  // Handle additional fields for signup
  if (mode === "signup") {
    const name = data.get("name");
    const confirmPassword = data.get("confirmPassword");

    if (!name || !confirmPassword) {
      return json({ message: "Name and confirm password are required!" }, { status: 422 });
    }

    if (authData.password !== confirmPassword) {
      return json({ message: "Passwords do not match!" }, { status: 422 });
    }

    authData.name = name;
    // Optionally include more fields here as needed
  }

  // Send request to backend
  const response = await fetch(`http://localhost:3000/auth/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 401) {
    return response;
  }

  // Redirect after successful login/signup
  return redirect('/');
}
