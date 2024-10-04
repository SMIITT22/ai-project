import { Typography, Input, Button } from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

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
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-lg shadow-lg bg-white border border-gray-300">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center">
            <Typography variant="h4" className="text-black font-gloria">
              QG
            </Typography>
          </div>

          <Typography className="text-center font-bold font-poppins text-black mb-2 text-lg sm:text-xl md:text-2xl">
            Login to Questions Generator
          </Typography>

          <Typography className="text-center text-gray-500 text-sm">
            Generate AI powered exam papers.
          </Typography>

          <hr className="w-full border-gray-300 mt-4" />
        </div>

        <div className="mb-6">
          <Typography variant="small" className="text-black mb-1">
            email
          </Typography>
          <Input
            type="email"
            placeholder="Enter your email"
            className="mb-4 border border-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex justify-between items-center mb-1 mt-2">
            <Typography variant="small" className="text-black">
              password
            </Typography>
            <a
              href="/forgot-password"
              className="text-sm text-green-500 hover:underline"
            >
              forget password?
            </a>
          </div>
          <Input
            type="password"
            placeholder="Enter your password"
            className="mb-6 border border-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <Typography className="text-center text-red-500 mb-4">
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          className="mb-4 bg-green-500 text-white rounded-md hover:bg-gray-800"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <div className="flex justify-center items-center mb-6">
          <Typography className="text-gray-600 text-sm">
            Don’t have an account?{" "}
            <a href="/signup" className="text-green-500 hover:underline">
              Sign up
            </a>
          </Typography>
        </div>

        <Button
          variant="outlined"
          fullWidth
          className="mb-6 border-black text-black hover:bg-gray-100 flex items-center justify-center gap-2"
        >
          <FcGoogle className="h-4 w-4" /> sign in with Google
        </Button>

        <Typography variant="small" className="text-center text-gray-500">
          By continuing, you acknowledge that you have read and understood, and
          agree to QG-Questions Generator AI’s{" "}
          <a href="/terms" className="text-green-500 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-green-500 hover:underline">
            Privacy Policy
          </a>
          .
        </Typography>
      </div>
    </div>
  );
};

export default Login;
