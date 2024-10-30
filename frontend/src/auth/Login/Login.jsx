import { Typography, Button } from "@material-tailwind/react";
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
      <div className="w-full max-w-xs sm:max-w-sm p-4 sm:p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          <div className="w-12 h-12 flex items-center justify-center mb-1 sm:mb-2">
            <Typography
              variant="h5"
              className="text-black dark:text-white font-gloria"
            >
              QG
            </Typography>
          </div>

          <Typography className="text-center font-bold font-poppins text-black dark:text-white mb-1 text-md sm:text-lg">
            Login to Questions Generator
          </Typography>

          <Typography className="text-center font-poppins text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
            Generate AI-powered question sets.
          </Typography>

          <hr className="w-full border-gray-300 dark:border-gray-700 mt-3" />
        </div>

        <div className="mb-3 sm:mb-4">
          <Typography
            variant="small"
            className="text-black dark:text-gray-300 font-poppins mb-1"
          >
            Email
          </Typography>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-lg focus:outline-none focus:border-black dark:focus:border-gray-400 mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex justify-between items-center font-poppins mb-1 mt-1">
            <Typography
              variant="small"
              className="text-black dark:text-gray-300 font-poppins"
            >
              Password
            </Typography>
            <a
              href="/forgot-password"
              className="text-xs text-black dark:text-gray-300 font-poppins hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-lg focus:outline-none focus:border-black dark:focus:border-gray-400 mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          fullWidth
          className="mb-3 sm:mb-4 bg-black dark:bg-gray-900 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-700 text-sm"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <div className="flex justify-center items-center mb-3">
          <Typography className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-poppins">
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
          className="mb-5 sm:mb-6 border-black dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <FcGoogle className="h-4 w-4" /> Sign in with Google
        </Button>

        <Typography
          variant="small"
          className="text-center text-gray-500 dark:text-gray-400 font-poppins text-xs sm:text-sm"
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
