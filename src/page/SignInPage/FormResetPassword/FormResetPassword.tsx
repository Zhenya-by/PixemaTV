import { FC, useState } from "react";
import "./FormResetPassword.scss";
import { Link } from "react-router-dom";
import { Input } from "../SignIn/Input/Input";

interface IFormResetPassword {}

export const FormResetPassword: FC<IFormResetPassword> = () => {
  const [email, setEmail] = useState("");

  const handleChangeEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  return (
    <form className="formSignIn">
      <div className="inputWraps">
        <h2 className="h2-SignIn">Reset password</h2>

        <Input
          title="Email"
          placeholder="Your Email"
          value={email}
          handleChange={handleChangeEmail}
          isDisabled={false}
        />
        <Link to="/reset-password" className="forgot-password" >
        </Link>
        <div className="formBtn-Wraps">
          <button>Reset</button>
        </div>

      </div>

      {/* <div className='inputWrap'>
                <div className='inputWrap__input'>
                    <Input
                        title='New Password'
                        placeholder='New Password'
                        value={passwordNew}
                        handleChange={handleChangePasswordNew}
                        isDisabled={false}
                    />
                </div>

            </div> */}
    </form>
  );
};
