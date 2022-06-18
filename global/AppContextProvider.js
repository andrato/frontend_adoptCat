import React from "react";


const AppContext = React.createContext();

const AppContextProvider = ({children}) => {

    const [userEmail, setUserEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");

    const changeEmail = (email) => {
        setUserEmail(email);
    }
    return (
        <AppContext.Provider value={{
            userEmail, phone, setUserEmail
        }}> 
        {children} 
        </AppContext.Provider>
    )
}
export {AppContext, AppContextProvider}