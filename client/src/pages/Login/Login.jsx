import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Login.scss';
function Login(props) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleLoginForm = () => { };

    const handlePressEnter = () => { };

    return (
        <div className='login-container d-flex flex-column justify-content-center'>
            <div className='container'>
                <div className='row px-sm-1 px-3'>
                    <div className='container-left col-sm-7 d-none d-sm-flex flex-column justify-content-center align-items-start ps-3'>
                        <div className='brand'>
                            <h1>
                                English Vocabulary Gallery
                            </h1>
                        </div>
                        <div className='detail'>
                            <p>
                                Add and manage and your own english vocabulary gallery all in our unique website anonymous.
                            </p>
                        </div>
                    </div>

                    <div className='container-right green col-12 col-sm-5 d-flex flex-column gap-3 py-3 justify-content-center'>
                        <div className='brand d-sm-none d-block'>
                            <h1>
                                English Vocabulary Gallery
                            </h1>
                        </div>

                        <h1 className='title'>Login Form</h1>
                        <input type="text" className="form-control" placeholder="Email address: " required
                            id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" className="form-control" placeholder="Password: " required
                            id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => handlePressEnter(e)} />

                        <div className="text-center">
                            <button type="submit" className='btn btn-primary' onClick={() => handleLoginForm()}>Login</button>
                            <div className='my-3'></div>
                            <a href="/reset-password" className="text-center forgot-password">Forgot password ?</a>
                            <hr />
                        </div>
                        <div className="text-center">
                            <Link to="/signup">
                                <button type="button" className='btn btn-success'>Create new account</button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;