import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../authSlice";
import { Typography, Input, Button } from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    const userData = { email, password };
    try {
      const resultAction = await dispatch(signupUser(userData));

      if (signupUser.fulfilled.match(resultAction)) {
        navigate("/");
      } else {
        console.error("Signup failed:", resultAction.error.message);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-white px-4">
      <div className="w-full max-w-sm p-6 sm:p-8 rounded-lg shadow-lg bg-white border border-gray-300">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center mb-2">
            <Typography variant="h4" className="text-black font-gloria">
              QG
            </Typography>
          </div>

          <Typography className="text-center font-bold font-poppins text-black mb-2 text-lg sm:text-xl">
            Sign Up to Questions Generator
          </Typography>

          <Typography className="text-center text-gray-500 text-sm font-poppins">
            Fast, easy, and full test set generation for your needs.
          </Typography>

          <hr className="w-full border-gray-300 mt-4" />
        </div>

        <div className="mb-6">
          <Typography variant="small" className="text-black mb-1 font-poppins">
            Email
          </Typography>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 border border-gray-300"
          />

          <Typography
            variant="small"
            className="text-black mb-1 mt-2 font-poppins"
          >
            Password
          </Typography>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 border border-gray-300"
          />
        </div>

        <Button
          fullWidth
          className="mb-4 bg-black text-white rounded-md hover:bg-gray-800"
          onClick={handleSignup}
        >
          Sign Up
        </Button>

        <div className="flex justify-center items-center mb-4">
          <Typography className="text-gray-600 text-sm font-poppins">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-black hover:underline font-poppins"
            >
              Sign in
            </a>
          </Typography>
        </div>

        <Button
          variant="outlined"
          fullWidth
          className="mb-6 border-black text-black hover:bg-gray-100 flex items-center justify-center gap-2"
        >
          <FcGoogle className="h-4 w-4" /> Sign up with Google
        </Button>

        <Typography
          variant="small"
          className="text-center text-gray-500 font-poppins"
        >
          By continuing, you acknowledge that you have read and understood, and
          agree to QG-Questions Generator AI’s{" "}
          <a href="/terms" className="text-black hover:underline font-poppins">
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-black hover:underline font-poppins"
          >
            Privacy Policy
          </a>
          .
        </Typography>
      </div>
    </div>
  );
};

export default SignUp;
