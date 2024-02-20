import React, { useState } from 'react';

const UserContext = React.createContext({
    token: '',
    isAuthenticated: false,
})

function UserProvider(props) {
    const { children } = props;
    const defaultUser = {
        token: '',
        account: {},
        isLoading: true,
        isAuthenticated: false,
    }
    const [user, setUser] = useState(defaultUser);

    const loginContext = (userData) => {
        setUser({
            ...userData,
            isLoading: false
        });
    }

    const logoutContext = () => {
        setUser({
            ...defaultUser,
            isLoading: false
        });
    }

    return (
        <div>
            <UserContext.Provider value={{ user, loginContext, logoutContext }}>
                {children}
            </UserContext.Provider>
        </div>
    );
}

export { UserProvider, UserContext };