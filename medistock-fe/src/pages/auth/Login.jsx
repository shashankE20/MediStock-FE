import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

import { toast } from "react-toastify";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    console.log(formData);

    try {

      const response = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data
      );

      toast.success("Lgoin Successful");
      navigate("/dashboard");

    } catch (err) {

      setError("Invalid Email or Password");
      toast.error("Invalid mail or passward");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          MediStock Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">

          <div>

            <label className="block mb-1 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>

            <label className="block mb-1 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {
            error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )
          }

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;