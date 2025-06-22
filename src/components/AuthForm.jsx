import { useState, useContext} from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";

import { userLogin } from "../services/login";
import { userSignUp } from "../services/register";

export default function AuthForm() {
  const { register, handleSubmit } = useForm();
    const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const [mode, setMode] = useState('login');


  const onSubmit = async (data) => {
    console.log(`${mode === 'login' ? 'Logging in' : 'Registering'}:`, data);

    try {
      const response = await (mode === 'login' ? userLogin(data) : userSignUp(data));
      setUser(response.data)
      navigate("/");
    } catch (error) {
      console.log(error.message);

    }
  };


  const toggleMode = () => setMode((prev) => (prev === 'login' ? 'register' : 'login'));




  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 p-6 bg-base-100 rounded-xl shadow-md flex flex-col gap-4"
    >

      {/* Username  */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <label className="input validator flex items-center">
          <input
            type="text"
            {...register("username")}
            required
            placeholder="username"
          />
        </label>
        <p className="validator-hint">Email is required</p>
      </div>


      {/* Email */}
     
        
        { mode !== 'login' && (
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email:</span>
            </label>
            <label className="input validator flex items-center">
              <input
                type="email"
                {...register("email")}
                required
                placeholder="mail@site.com"
              />
            </label>
            <p className="validator-hint">Email is required</p>
          </div>
        )}


      {/* Pass */}

      <div className="form-control">
        <label className="label">
          <span className="label-text">Password:</span>
        </label>
        <label className="input validator flex items-center">
          <input
            type="password"
            {...register("password")}
            required
            placeholder="Password"
            //Commented for testing
            // minLength="8"
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>
        <p className="validator-hint">
          Must be more than 8 characters, including
          At least one number
          At least one lowercase letter
          At least one uppercase letter
        </p>
      </div>


      <button type="submit" className="btn btn-primary mt-4">
        {mode === 'login' ? 'Log in' : 'Register'}
      </button>

      <div className="text-center text-sm mt-2">
        {mode === 'login' ? (
          <p>
            Don't have an account?{" "}
            <button type="button" className="link link-primary" onClick={toggleMode}>
              Register
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button type="button" className="link link-primary" onClick={toggleMode}>
              Log in
            </button>
          </p>
        )}
      </div>

    </form>
  );

};