import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MenuBarsDark from "../assets/menu/MenuBarsDark.svg";
import MenuBarsLight from "../assets/menu/MenuBarsLight.svg";
import HomeDark from "../assets/menu/HomeDark.svg";
import HomeLight from "../assets/menu/HomeLight.svg";
import ChatDark from "../assets/menu/ChatDark.svg";
import ChatLight from "../assets/menu/ChatLight.svg";
import NotificationBellDark from "../assets/menu/NotificationBellDark.svg";
import NotificationBellLight from "../assets/menu/NotificationBellLight.svg";
import ExploreDark from "../assets/menu/ExploreDark.svg";
import ExploreLight from "../assets/menu/ExploreLight.svg";
import MenuSettings from "./modals/MenuSettings";
import "./styles/Menu.css";

const Menu = ({
    theme,
    toggleTheme,
    authUser,
    handleLogout,
    showMenu,
    handleShowMenu,
    showMenuRef,
}) => {

    const navigate = useNavigate();

    return ( 
        <div className="Menu">
            <h1 className="Menu-title" onClick={() => navigate('/')}>Orbly</h1>
            <div className="Menu-links">
                {authUser ? (
                    <>
                        <NavLink to="/" className="Menu-link">
                            <div className="Menu-link-text-container">
                                <img src={theme === 'light' ? HomeLight : HomeDark} alt="Home" className="Menu-link-text-image" />
                                <span className="Menu-link-text">Home</span>
                            </div>
                        </NavLink>
                        <NavLink to="/explore" className="Menu-link">
                            <div className="Menu-link-text-container">
                                <img src={theme === 'light' ? ExploreLight : ExploreDark} alt="Explore" className="Menu-link-text-image" />
                                <span className="Menu-link-text">Explore</span>
                            </div>
                        </NavLink>
                        <NavLink to="/notifications" className="Menu-link">
                            <div className="Menu-link-text-container">
                                <img src={theme === 'light' ? NotificationBellLight : NotificationBellDark} alt="Notifications" className="Menu-link-text-image" />
                                <span className="Menu-link-text">Notifications</span>
                            </div>
                        </NavLink>
                        <NavLink to="/chat" className="Menu-link">
                            <div className="Menu-link-text-container">
                                <img src={theme === 'light' ? ChatLight : ChatDark} alt="Chat" className="Menu-link-text-image" />
                                <span className="Menu-link-text">Chat</span>
                            </div>
                        </NavLink>
                        <NavLink to="/profile" className="Menu-link">
                            <div className="Menu-link-text-container">
                                <img src={authUser?.photoURL} alt="Profile" className="Menu-link-text-image-profile" />
                                <span className="Menu-link-text">Profile</span>
                            </div>
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="Menu-link-null">
                            Login
                        </NavLink>
                        <NavLink to="/register" className="Menu-link-null">
                            Register
                        </NavLink>
                    </>
                )}
           </div>
           {authUser ? (
                <div className="Menu-settings">
                    <div className="Menu-settings-area" onClick={handleShowMenu}>
                        <img src={theme === 'light' ? MenuBarsLight : MenuBarsDark} alt="Menu Bars" className="Menu-settings-area-icon-image" />
                        <span className="Menu-settings-area-text-text">Menu</span>
                    </div>
                </div>
           ) : (
            null
           )}
           {showMenu && (
                <MenuSettings
                    theme={theme}
                    toggleTheme={toggleTheme}
                    authUser={authUser}
                    handleLogout={handleLogout}
                    showMenu={showMenu}
                    handleShowMenu={handleShowMenu}
                    showMenuRef={showMenuRef}
                />
           )}
        </div>
    );
}
 
export default Menu;