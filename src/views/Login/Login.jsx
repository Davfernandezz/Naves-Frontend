import { useEffect, useState } from "react";
import { CInput } from "../../components/CInput/CInput";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../contexts/AuthContext';
import { loginUser } from "../../services/authApiCalls";
import "./Login.css";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { passport, setPassport } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setCredentials(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  useEffect(() => {
    if (passport && passport.token) {
      navigate("/");
    }
  }, [passport, navigate]);

  async function login() {
    try {
      const response = await loginUser(credentials);
      if (response.success) {
        const token = response.token; 
        if (token) {
          const decodedToken = jwtDecode(token);
          setPassport({
            token: token,
            tokenData: decodedToken,
          });
          localStorage.setItem("passport", JSON.stringify({ token, tokenData: decodedToken }));
          navigate("/access"); 
        } else {
          console.log("Login failed")
        }
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="login-wrapper">
        <div className="login-container">
            <h1 className="login-title text-center mb-4">Management System</h1>
            <h2 className="login-subtitle text-center mb-4">User Login</h2>
            <form>
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="form-control login-input"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="form-control login-input"
                    />
                </div>
                <button
                    type="button"
                    onClick={login}
                    className="btn btn-primary w-100 login-button"
                >
                    Login
                </button>
            </form>
        </div>
    </div>
);
};
export default Login;