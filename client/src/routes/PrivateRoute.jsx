import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

function PrivateRoute(props) {
    const { user } = useContext(UserContext);
    const { children } = props;

    return (
        <div>
            {(user && user.isAuthenticated === true)
                ? <>{children}</>
                : <Navigate to="/login" />
            }
        </div>
    );
}

export default PrivateRoute;