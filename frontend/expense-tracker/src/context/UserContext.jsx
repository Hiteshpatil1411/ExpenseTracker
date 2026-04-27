import React, { createContext, useState} from "react";


export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    }

    //funtion to clear user data
    const clearUser = () => {
        setUser(null);
    }

    return (
        <UserContext.Provider 
        value={{
            user,
            updateUser,
            clearUser,

        }}>
            {children}
        </UserContext.Provider>
    )
}

UserProvider.Context = UserContext;

export default UserProvider;