import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import { NavLink } from 'react-router-dom';

Header.propTypes = {
    user: PropTypes.object,
};

Header.defaultProps = {
    user: null,
}

function Header(props) {
    const { user } = props;


    return (
        <header className='my-header'>
            <div className='container w-100'>
                <nav className="navbar navbar-expand-lg bg-light ">
                    <div className="container-fluid">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <div className="collapse navbar-collapse" id="navbarText">

                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='/vocabulary'>Vocabulary</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='/statistics'>Statistics</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='/forum'>Forum</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='/contact'>Contact</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='/about'>About</NavLink>
                                </li>
                            </ul>

                            <li className="nav-item">
                                <NavLink className="login-btn nav-link" to='/login'>Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="signup-btn nav-link" to='/signup'>Signup</NavLink>
                            </li>

                        </div>
                    </div>
                </nav>
            </div>


        </header>
    );
}

export default Header;