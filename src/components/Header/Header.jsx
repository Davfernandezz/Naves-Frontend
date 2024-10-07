import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

export const Header = () => {
    const { passport, setPassport } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("passport");
        setPassport(null);
        navigate("/");
    };

    const CSurfer = ({ path, content }) => (
        <div className="nav-item" onClick={() => navigate(path)}>
            {content}
        </div>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                <a
                    className="navbar-brand"
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/');
                    }}
                >
                    <span className="brand">NAVES</span>Col·lab
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <CSurfer path="/" content="Home" />
                        </li>
                        {passport && passport.token ? (
                            <>
                                <li className="nav-item">
                                    <CSurfer path="/access" content="Access" />
                                </li>
                                <li className="nav-item">
                                    <CSurfer path="/reserve" content="Reserve" />
                                </li>
                                <li className="nav-item">
                                    <CSurfer path="/room" content="Rooms" />
                                </li>
                                <li className="nav-item">
                                    <CSurfer path="/person" content="Person" />
                                </li>
                                <li className="nav-item">
                                    <CSurfer path="/myHistory" content="My History" />
                                </li>
                                {passport.tokenData?.role === "admin" && (
                                    <>
                                        <li className="nav-item">
                                            <CSurfer path="/accessHistory" content="Access History" />
                                        </li>
                                        <li className="nav-item">
                                            <CSurfer path="/administration" content="Admin" />
                                        </li>
                                    </>
                                )}
                                <li className="nav-item">
                                    <div className="nav-item" onClick={handleLogout}>
                                        Logout
                                    </div>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <CSurfer path="/login" content="Login" />
                                </li>
                                <li className="nav-item">
                                    <CSurfer path="/register" content="Register" />
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};