import { Form, Link, useSearchParams } from "react-router-dom";
import Input from "../../components/Input";
import styles from "../../style";
import Button from "../../components/Button";

const LoginForm = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <div className="flex items-center justify-center w-full">
      <Form method="post" >
        <h2 className={`${styles.heading} my-9`}>
          {isLogin ? "Log In" : "Create New Account"}
        </h2>
        <div className={`flex flex-col `}>
          {!isLogin && <Input label="Name" name="name" placeholder="John Doe"/>}
          <Input label="Email" name="email" placeholder="johndoe@gmail.com" />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="********"
          />
          {!isLogin && (
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="********"
            />
          )}
        </div>

        <Button label="Save" type="submit" />
        <Link
          to={`?mode=${isLogin ? "signup" : "login"}`}
          className="block mt-4 text-blue-600 hover:underline"
        >
          {isLogin
            ? "New Customer? Create your account"
            : "Already have an account? Login Here"}
        </Link>
      </Form>
    </div>
  );
};

export default LoginForm;
