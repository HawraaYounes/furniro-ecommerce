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
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  console.log("AUTH DATA", authData);
  return null;
}
