import React, { useState, useEffect, useRef } from "react";
import Menu from "../components/Menu";
import ProfileInfo from "../components/ProfileInfo";
import EditProfile from "../components/modals/EditProfile";
import "./styles/Profile.css";

const Profile = ({
    theme,
    toggleTheme,
    authUser,
    handleLogout,
    showMenu,
    handleShowMenu,
    showMenuRef,
}) => {

    const [editProfile, setEditProfile] = useState(false);
    const editProfileRef = useRef(editProfile);

    const handleEditProfile = () => {
        setEditProfile(true);
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(editProfileRef.current && editProfile && !editProfileRef.current.contains(e.target)){
                setEditProfile(false)
            } 
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

    }, [editProfileRef, editProfile]);

    return ( 
        <div className="Profile">
            <Menu
                theme={theme}
                toggleTheme={toggleTheme}
                authUser={authUser}
                handleLogout={handleLogout}
                showMenu={showMenu}
                handleShowMenu={handleShowMenu}
                showMenuRef={showMenuRef}
            />
            <ProfileInfo 
                authUser={authUser}
                theme={theme}
                handleEditProfile={handleEditProfile}
            />
            {editProfile && (
                <EditProfile
                    theme={theme}
                    authUser={authUser}
                    editProfile={editProfile}
                    editProfileRef={editProfileRef}
                    handleEditProfile={handleEditProfile}
                    setEditProfile={setEditProfile}
                />
            )}
        </div>
    );


}
 
export default Profile;