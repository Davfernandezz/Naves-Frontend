import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Header = () => {

    const navigate = useNavigate();

    return (
        <>
            <ul>
                <div onClick={()=>navigate('/')}>Home</div>
                <div onClick={()=>navigate('/login')}>Login</div>
                <div onClick={()=>navigate('/register')}>Register</div>
                <div onClick={()=>navigate('/access')}>Access</div>
                <div onClick={()=>navigate('/reserve')}>Reserve</div>
                <div onClick={()=>navigate('/room')}>Room</div>
                <div onClick={()=>navigate('/person')}>Person</div>
                <div onClick={()=>navigate('/myHistory')}>My History</div>
                <div onClick={()=>navigate('/accessHistory')}>Access History</div>
            </ul>
        </>
    )
}