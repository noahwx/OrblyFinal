import React from "react";
import BookmarkDark from "../../assets/menu/menusettings/BookmarkDark.svg";
import BookmarkLight from "../../assets/menu/menusettings/BookmarkLight.svg";
import HelpDark from "../../assets/menu/menusettings/HelpDark.svg";
import HelpLight from "../../assets/menu/menusettings/HelpLight.svg";
import SettingsDark from "../../assets/menu/menusettings/SettingsGearDark.svg";
import SettingsLight from "../../assets/menu/menusettings/SettingsGearLight.svg";
import LogoutDark from "../../assets/menu/menusettings/LogOutDark.svg";
import LogoutLight from "../../assets/menu/menusettings/LogOutLight.svg";
import ThemeDark from "../../assets/menu/menusettings/ThemeDark.svg";
import ThemeLight from "../../assets/menu/menusettings/ThemeLight.svg";
import "./styles/MenuSettings.css";

const MenuSettings = ({
    theme,
    toggleTheme,
    authUser,
    handleLogout,
    showMenu,
    handleShowMenu,
    showMenuRef,
}) => {

    return ( 
        <div className="Menu-Settings-Modal" ref={showMenuRef}>
            <div className="Menu-Settings-Modal-items">
                <div className="Menu-Settings-Modal-item" onClick={toggleTheme}>
                    <img src={theme === 'light' ? ThemeLight : ThemeDark} alt="Bookmarks" className="Menu-Settings-Modal-item-image" />
                    <span className="Menu-Settings-Modal-item-text">Theme</span>
                </div>
                <div className="Menu-Settings-Modal-item">
                    <img src={theme === 'light' ? BookmarkLight : BookmarkDark} alt="Bookmarks" className="Menu-Settings-Modal-item-image" />
                    <span className="Menu-Settings-Modal-item-text">Bookmarks</span>
                </div>
                <div className="Menu-Settings-Modal-item">
                    <img src={theme === 'light' ? HelpLight : HelpDark} alt="Bookmarks" className="Menu-Settings-Modal-item-image" />
                    <span className="Menu-Settings-Modal-item-text">Help</span>
                </div>
                <div className="Menu-Settings-Modal-item">
                    <img src={theme === 'light' ? SettingsLight : SettingsDark} alt="Bookmarks" className="Menu-Settings-Modal-item-image" />
                    <span className="Menu-Settings-Modal-item-text">Settings</span>
                </div>
                <div className="Menu-Settings-Modal-item" onClick={handleLogout}>
                    <img src={theme === 'light' ? LogoutLight : LogoutDark} alt="Bookmarks" className="Menu-Settings-Modal-item-image" />
                    <span className="Menu-Settings-Modal-item-text">Logout</span>
                </div>
            </div>
        </div>
    );

}
 
export default MenuSettings;