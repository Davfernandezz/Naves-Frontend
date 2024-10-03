import React, { useEffect, useState } from 'react'
import { CInput } from '../../components/CInput/CInput';
import { registerUser } from '../../services/authApiCalls';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import "./Register.css";

export const Register = () => {

    const { passport } = useAuth();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        name: "",
        surnames: "",
        dni: "",
        phone: "",
        startup: ""
    });

    useEffect(() => {
        if (passport && passport.token) {
            navigate("/");
        }
    }, [passport, navigate]);

    function handleChange(e) {
        const { name, value } = e.target;
        setCredentials((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    async function register() {
        const { email, password, name, surnames, dni, phone, startup } = credentials;

        if (!email || !password || !name || !surnames || !dni) {
            console.log("Name, surnames, email, password, and DNI are required");
            return;
        }

        if (password.length < 9 || password.length > 17) {
            console.log("Password must be between 9 and 17 characters");
            return;
        }

        try {
            const response = await registerUser(credentials);
            if (response.success) {
                navigate('/login');
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.log("Error en el registro:", error);
        }
    }

    return (
        <div className="register-wrapper">
            <div className="register-container">
                <h1 className="register-title text-center mb-4">Management System</h1>
                <h2 className="register-subtitle text-center mb-4">User Register</h2>
                <form>
                    <div className="row mb-3">
                        <div className="col-12 col-md-6">
                            <CInput type="email" name="email" placeholder="Email" emitFunction={handleChange} className="form-control register-input" />
                        </div>
                        <div className="col-12 col-md-6">
                            <CInput type="password" name="password" placeholder="Password" emitFunction={handleChange} className="form-control register-input" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12 col-md-6">
                            <CInput type="text" name="name" placeholder="Name" emitFunction={handleChange} className="form-control register-input" />
                        </div>
                        <div className="col-12 col-md-6">
                            <CInput type="text" name="surnames" placeholder="Surnames" emitFunction={handleChange} className="form-control register-input" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12 col-md-6">
                            <CInput type="text" name="dni" placeholder="DNI" emitFunction={handleChange} className="form-control register-input" />
                        </div>
                        <div className="col-12 col-md-6">
                            <CInput type="text" name="phone" placeholder="Phone" emitFunction={handleChange} className="form-control register-input" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <CInput type="text" name="startup" placeholder="Startup" emitFunction={handleChange} className="form-control register-input" />
                    </div>
                    <button
                        type="button"
                        onClick={register}
                        className="btn btn-primary w-100 register-button"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;