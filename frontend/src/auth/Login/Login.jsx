import { Typography, Input, Button } from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-white dark:bg-black px-4">
      <div className="w-full max-w-sm p-6 sm:p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center mb-2">
            <Typography
              variant="h4"
              className="text-black dark:text-white font-gloria"
            >
              QG
            </Typography>
          </div>

          <Typography className="text-center font-bold font-poppins text-black dark:text-white mb-2 text-lg sm:text-xl">
            Login to Questions Generator
          </Typography>

          <Typography className="text-center font-poppins text-gray-500 dark:text-gray-400 text-sm">
            Generate AI powered question sets.
          </Typography>

          <hr className="w-full border-gray-300 dark:border-gray-700 mt-4" />
        </div>

        <div className="mb-4">
          <Typography
            variant="small"
            className="text-black dark:text-gray-300 font-poppins mb-1"
          >
            Email
          </Typography>
          <Input
            type="email"
            placeholder="Enter your email"
            className="mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex justify-between items-center font-poppins mb-1 mt-2">
            <Typography
              variant="small"
              className="text-black dark:text-gray-300 font-poppins"
            >
              Password
            </Typography>
            <a
              href="/forgot-password"
              className="text-sm text-black dark:text-gray-300 font-poppins hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <Input
            type="password"
            placeholder="Enter your password"
            className="mb-6 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          fullWidth
          className="mb-4 bg-black dark:bg-gray-900 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-700"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <div className="flex justify-center items-center mb-4">
          <Typography className="text-gray-600 dark:text-gray-400 text-sm font-poppins">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-black dark:text-white hover:underline font-poppins"
            >
              Sign up
            </a>
          </Typography>
        </div>

        <Button
          variant="outlined"
          fullWidth
          className="mb-6 border-black dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
        >
          <FcGoogle className="h-4 w-4" /> Sign in with Google
        </Button>

        <Typography
          variant="small"
          className="text-center text-gray-500 dark:text-gray-400 font-poppins"
        >
          By continuing, you acknowledge that you have read and understood, and
          agree to QG-Questions Generator AI’s{" "}
          <a
            href="/terms"
            className="text-black dark:text-white hover:underline font-poppins"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-black dark:text-white hover:underline font-poppins"
          >
            Privacy Policy
          </a>
          .
        </Typography>
      </div>
    </div>
  );
};

export default Login;
