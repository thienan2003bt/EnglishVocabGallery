import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../../services/user.s';
import { toast } from 'react-toastify';
import _ from 'lodash';
import './Signup.scss';

function Signup(props) {
    const defaultUserData = {
        email: '',
        username: '',
        password: '',
        retypePassword: '',
    }
    const [userData, setUserData] = useState(defaultUserData);

    const navigate = useNavigate();

    const handleChangeUserData = (name, value) => {
        let newData = _.cloneDeep(userData);
        newData[name] = value;

        setUserData(newData);
    }

    const handlePressEnter = () => {

    };

    const validateSignupForm = () => {
        console.log("Have reached validate signup form logic ");
        const toCheckAttributeArr = ['email', 'username', 'password', 'retypePassword'];
        for (let i = 0; i < toCheckAttributeArr.length; i++) {
            let attribute = toCheckAttributeArr[i];
            if (userData[attribute] === '') {
                toast.error(`${attribute} is required`);
                return false;
            }
        }

        if (userData.password !== userData.retypePassword) {
            toast.error("Password do not match the retype password !");
            return false;
        }

        return true;
    }

    const handleSignupForm = async () => {
        try {
            let validState = validateSignupForm();
            if (validState === true) {
                let response = await UserService.handleSignup(userData);
                if (response && parseInt(response.status) === 200) {
                    toast.success(response.message);
                    setUserData(defaultUserData);
                    navigate('/login');
                } else {
                    toast.error("Error signing up: " + response?.message);
                }
            }
        } catch (error) {
            toast.error("Error signing up: " + error.message);
        }
    }

    return (
        <div className='signup-container d-flex flex-column justify-content-center'>
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

                        <h1 className='title'>Signup Form</h1>

                        <input type="text" className="form-control" placeholder="Email address: " required
                            id="email" name="email"
                            value={userData.email} onChange={(e) => handleChangeUserData(e.target.name, e.target.value)}
                        />
                        <input type="text" className="form-control" placeholder="Username: "
                            id="username" name="username"
                            value={userData.username} onChange={(e) => handleChangeUserData(e.target.name, e.target.value)}
                        />
                        <input type="password" className="form-control" placeholder="Password: " required
                            id="password" name="password"
                            value={userData.password} onChange={(e) => handleChangeUserData(e.target.name, e.target.value)}
                        />
                        <input type="password" className="form-control" placeholder="Retype password: " required
                            id="retypePassword" name="retypePassword"
                            value={userData.retypePassword} onChange={(e) => handleChangeUserData(e.target.name, e.target.value)}
                            onKeyDown={(e) => handlePressEnter(e)} />

                        <div className="text-center">
                            <button type="submit" className='btn btn-primary' onClick={() => handleSignupForm()}>Signup</button>
                            <div className='my-3'></div>
                            <hr />
                            <span className="text-center forgot-password">Already have an account ?</span>
                        </div>

                        <div className="text-center">
                            <Link to="/login">
                                <button type="button" className='btn btn-success'>Login</button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Signup;