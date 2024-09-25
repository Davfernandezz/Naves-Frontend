import React, { useState } from 'react'
import "./Register.css";
import { CInput } from '../../components/CInput/CInput';
import { registerUser } from '../../services/authApiCalls';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
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
        <>
            <h1>Register</h1>
            <div>
                <CInput type="email" name="email" placeholder="Email" emitFunction={handleChange} />
            </div>
            <div>
                <CInput type="password" name="password" placeholder="Password" emitFunction={handleChange} />
            </div>
            <div>
                <CInput type="text" name="name" placeholder="Name" emitFunction={handleChange} />
            </div>
            <div>
                <CInput type="text" name="surnames" placeholder="Surnames" emitFunction={handleChange} />
            </div>
            <div>
                <CInput type="text" name="dni" placeholder="DNI" emitFunction={handleChange} />
            </div>
            <div>
                <CInput type="text" name="phone" placeholder="Phone" emitFunction={handleChange} />
            </div>
            <div>
                <CInput type="text" name="startup" placeholder="Startup" emitFunction={handleChange} />
            </div>
            <div>
                <input type="button" value="Register" onClick={register} />
            </div>
        </>
    );
}


export default Register;