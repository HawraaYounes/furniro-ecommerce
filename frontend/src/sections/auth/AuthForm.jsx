import { Form, Link, useSearchParams } from "react-router-dom";
import Input from "../../components/Input";
import styles from "../../style";
import Button from "../../components/Button";

const LoginForm = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Form className="w-full max-w-md p-8 rounded-lg" method="post">
        <h2 className={`${styles.heading}`}>
          {isLogin ? "Log In" : "Create New Account"}
        </h2>
        {!isLogin && <Input label="Name" name="name" />}
        <Input label="Email" name="email" />
        <Input label="Password" name="password" type="password" />
        {!isLogin && (
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
          />
        )}
        <Button label="Save" type="submit" />
        <Link to={`?mode=${isLogin ? "signup" : "login"}`} className="block mt-4 text-blue-600 hover:underline">
          {isLogin
            ? "New Customer? Create your account"
            : "Already have an account? Login Here"}
        </Link>
      </Form>
    </div>
  );
};

export default LoginForm;
