import { Form, Link, useSearchParams } from "react-router-dom";
import Input from "../../components/Input";
import styles from "../../style";
import Button from "../../components/Button";


const LoginForm = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <Form className="" method="post">
      <h2 className={`${styles.heading}`}>
        {isLogin ? "Log In" : "Create New Account"}
      </h2>
      <Input label="Email" />
      <Input label="Password" />
      {!isLogin && <Input label="Confirm Password" />}
      <Button label="Save" type="submit" />
      <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
        {isLogin
          ? "New Customer? Create your account"
          : "Already have an account? Login Here"}
      </Link>
    </Form>
  );
};

export default LoginForm;
