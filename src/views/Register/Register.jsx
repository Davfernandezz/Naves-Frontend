import React, { useState } from 'react'
import "./Register.css";
import { CInput } from '../../components/CInput/CInput';

export const Register = () => {

    const [credentials, setCredentials] = useState(
        {
            email: "",
            password: ""
        }
    )

    function handleChange(e){
        console.log('Handle Change')
        setCredentials( (prevState)=>(
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    function register() {
        console.log(credentials);
    }
    
    return (
        <>
            <h1>Register</h1>
          <div>
            <CInput type="email" name="email" placeholder='Email' onChange={handleChange} />
          </div>
          <div>
            <CInput type="password" name="password" placeholder='Password' onChange={handleChange} />
          </div>
          <div>
            <input type="button" value="Register" onClick={register} />
          </div>
        </>
    )
}
export default Register;