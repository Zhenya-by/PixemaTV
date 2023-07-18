import { FC } from "react";
import "./SignIn.scss";
import { Link } from "react-router-dom";
import { Logo } from "../../../components/Logo/Logo";
import { FormSignIn } from "../FormSignIn/FormSignIn";

interface ISignIn {}

export const SignIn: FC<ISignIn> = () => {
  return (
    <div className="signIn-wrap">
      <Link to="/home">
        <div className="logoImg">
          <Logo></Logo>
        </div>
      </Link>
      <FormSignIn></FormSignIn>
    </div>
  );
};
