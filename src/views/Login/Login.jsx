import { useEffect, useState } from "react";
import { CInput } from "../../components/CInput/CInput";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../contexts/AuthContext';
import "./Login.css";
import { loginUser } from "../../services/authApiCalls";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setCredentials(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const { passport, setPassport } = useAuth();
  const navigate = useNavigate();

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
          navigate("/"); 
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
        <>
          <h1>Login</h1>
          <div>
            <CInput type="email" name="email" placeholder='Email' emitFunction={handleChange} />
          </div>
          <div>
            <CInput type="password" name="password" placeholder='Password' emitFunction={handleChange} />
          </div>
          <div>
            <input type="button" value="Login" onClick={login} />
          </div>
        </>
      )
}

export default Login;