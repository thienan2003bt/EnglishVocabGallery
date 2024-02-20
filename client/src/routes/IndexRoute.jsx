import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';

function IndexRoute(props) {
    return (
        <div>
            <Routes>
                {/* Public */}
                <Route path="/" element="Home" />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Private */}
                <Route path="/vocabulary" element={
                    <PrivateRoute>
                        <span>Element has been developed soon ...</span>
                    </PrivateRoute>
                } >
                </Route>
                <Route path="/statistics" element={
                    <PrivateRoute>
                        <span>Element has been developed soon ...</span>
                    </PrivateRoute>
                } >
                </Route>
                <Route path="/forum" element={
                    <PrivateRoute>
                        <span>Element has been developed soon ...</span>
                    </PrivateRoute>
                } >
                </Route>

                <Route path="/contact" element="Contact" />
                <Route path="/about" element="About" />

                {/* Not Found */}
                <Route path="*" element="404 Not Found" />


            </Routes>
        </div>
    );
}

export default IndexRoute;