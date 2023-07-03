import React from "react";
import Menu from "../components/Menu";
import "./styles/Notifications.css";

const Notifications = ({
    theme,
    toggleTheme,
    authUser,
    handleLogout,
    showMenu,
    handleShowMenu,
    showMenuRef,
}) => {
    return ( 
        <div className="Notifications">
            <Menu
                theme={theme}
                toggleTheme={toggleTheme}
                authUser={authUser}
                handleLogout={handleLogout}
                showMenu={showMenu}
                handleShowMenu={handleShowMenu}
                showMenuRef={showMenuRef}
            />
            <h1 className="Notifications-title">Notifications</h1>
        </div>
    );
}
 
export default Notifications;