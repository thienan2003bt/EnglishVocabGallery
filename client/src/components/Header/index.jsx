import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'

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
            <a className='btn btn-primary' href="/home">
                <i className="fa-solid fa-house"></i>
                Home
            </a>

            <div className="my-navbar">
                <a className='btn btn-primary' href="/vocab">Vocabulary</a>
                <a className='btn btn-primary' href="/quiz">Quiz</a>
                <a className='btn btn-primary' href="/forum">Forum</a>
                <a className='btn btn-primary' href="/contact">Contact</a>
                <a className='btn btn-primary' href="/about">About</a>

                {!user
                    ? <>
                        <a className='btn btn-primary login-btn' href="/login">Login</a>
                        <a className='btn btn-primary' href="/signup">Signup</a>
                    </>
                    : <>
                        <a className='btn btn-primary' href="/profile">Profile</a>
                    </>
                }
            </div>

        </header>
    );
}

export default Header;