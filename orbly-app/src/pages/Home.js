import React from "react";
import Menu from "../components/Menu";
import "./styles/Home.css";
import Homefeed from "../components/Homefeed";

const Home = ({
    theme,
    toggleTheme,
    authUser,
    handleLogout,
    showMenu,
    handleShowMenu,
    showMenuRef
}) => {

    return ( 
        <div className="Home">
            <Menu 
                theme={theme}
                toggleTheme={toggleTheme}
                authUser={authUser}
                handleLogout={handleLogout}
                showMenu={showMenu}
                handleShowMenu={handleShowMenu}
                showMenuRef={showMenuRef}
            />
            <Homefeed 
                theme={theme}
                authUser={authUser}
            />
        </div>
    );

}
 
export default Home;