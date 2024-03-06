import React, { useEffect, useState } from 'react';
import UserService from '../services/user.s';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserContext = React.createContext({
    token: '',
    isAuthenticated: true,
})

function UserProvider(props) {
    const navigate = useNavigate();

    const { children } = props;
    const defaultUser = {
        token: '',
        account: {},
        isLoading: true,
        isAuthenticated: false,
    }
    const [user, setUser] = useState(defaultUser);
    const [isFirstRender, setIsFirstRender] = useState(false);

    const loginContext = (userData) => {
        let newData = {
            isAuthenticated: true,
            isLoading: false,
            token: userData.token,
            account: userData.account
        }
        setUser(newData);
    }

    const logoutContext = () => {
        let newData = {
            ...defaultUser,
            isLoading: false
        }
        setUser(newData);
    }


    const fetchUser = async () => {
        try {
            let response = await UserService.getUserAccount();
            if (response && response.data && parseInt(response.status) === 200) {
                let newData = {
                    isAuthenticated: true,
                    isLoading: false,
                    token: response.data.accessToken,
                    account: response.data.account
                };

                setUser(newData);
            } else {
                setUser({ ...defaultUser, isLoading: false });
                navigate('/login')
            }

            setIsFirstRender(true);
        } catch (error) {
            toast.error("Error fetching user: ", error);
            setUser({ ...defaultUser, isLoading: false });
            navigate('/login');
            setIsFirstRender(true);
        }

    }

    useEffect(() => {
        const nonFetchPath = ['/', '/login', '/signup'];
        if (!nonFetchPath.includes(window.location.pathname)) {
            fetchUser();
        } else {
            setUser({ ...defaultUser, isLoading: false });
            setIsFirstRender(true);
        }
    }, []);

    return (
        <div>
            {isFirstRender &&
                <UserContext.Provider value={{ user, loginContext, logoutContext }}>
                    {children}
                </UserContext.Provider>
            }
        </div>
    );
}

export { UserProvider, UserContext };