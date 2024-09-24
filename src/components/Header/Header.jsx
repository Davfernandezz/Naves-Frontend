import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Header = () => {

    const navigate = useNavigate();

    return (
        <>
            <ul>
                <div onClick={()=>navigate('/login')}>Login</div>
                <div onClick={()=>navigate('/register')}>Register</div>
            </ul>
        </>
    )
}