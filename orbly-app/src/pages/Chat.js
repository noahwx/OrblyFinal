import React from "react";
import Menu from "../components/Menu";
import "./styles/Chat.css";

const Chat = ({
    theme,
    toggleTheme,
    authUser,
    handleLogout,
    showMenu,
    handleShowMenu,
    showMenuRef,
}) => {
    return ( 
        <div className="Chat">
            <Menu 
                theme={theme}
                toggleTheme={toggleTheme}
                authUser={authUser}
                handleLogout={handleLogout}
                showMenu={showMenu}
                handleShowMenu={handleShowMenu}
                showMenuRef={showMenuRef}
            />
            <h1 className="Chat-title">Chat</h1>
        </div>
    );
}
 
export default Chat;