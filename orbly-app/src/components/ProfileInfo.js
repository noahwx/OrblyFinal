import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import LocationDark from "../assets/profile/profileinfo/LocationDark.svg";
import LocationLight from "../assets/profile/profileinfo/LocationLight.svg";
import ArrowTopDark from "../assets/profile/profileinfo/ArrowTopDark.svg";
import ArrowTopLight from "../assets/profile/profileinfo/ArrowTopLight.svg";
import CalendarDark from "../assets/profile/profileinfo/CalendarDark.svg";
import CalendarLight from "../assets/profile/profileinfo/CalendarLight.svg";
import "./styles/ProfileInfo.css";
import ProfilePost from "./ProfilePost";

const Profile = ({
    authUser,
    theme,
    handleEditProfile,
}) => {

    const currentUser = window.sessionStorage.getItem("username").replace(/"/g, "");
    const currentUID = window.sessionStorage.getItem("user").replace(/"/g, "");

    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        const getUserInfo = async () => {
            const q = query(collection(db, "users"), where("username", "==", currentUser));
            onSnapshot(q, (querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push(doc.data());
                });
                
                setUserInfo(data);
            });
        }

        getUserInfo();
        
    }, [currentUser]);

    console.log(userInfo);

    const [currentTab, setCurrentTab] = useState(1);

    const handleTabChange = (index) => {
        setCurrentTab(index);
    }

    return ( 
        <div className="ProfileInfo">
            {userInfo.map((user) => (
                <div className="ProfileInfo-container" key={user.id}>
                    <div className="ProfileInfo-header">
                        <div className="ProfileInfo-header-avatar">
                            <img src={user.photoURL} alt="Avatar" className="ProfileInfo-header-avatar-user" />
                        </div>
                        <div className="ProfileInfo-header-info">
                            <div className="ProfileInfo-header-info-fullName">
                                {user.fullName}
                            </div>
                            <div className="ProfileInfo-header-info-username">
                                @{user.username}
                            </div>
                        </div>
                        <div className="ProfileInfo-header-bio">
                            {user.bio}
                        </div>
                        <div className="ProfileInfo-header-other-info">
                            <div className="ProfileInfo-header-other-info-location">
                                <img src={theme === "light" ? LocationLight : LocationDark} alt="Location" className="ProfileInfo-header-other-info-location-icon" />
                                &nbsp;
                                <span className="ProfileInfo-header-other-info-location-text">
                                    {user.location}
                                </span>
                            </div>
                            <div className="ProfileInfo-header-other-info-website">
                                <img src={theme === "light" ? ArrowTopLight : ArrowTopDark} alt="Website" className="ProfileInfo-header-other-info-website-icon" />
                                &nbsp;
                                <a href={user.website} target="_blank" rel="noopener noreferrer" className="ProfileInfo-header-other-info-website-link">
                                    {user.website}
                                </a>
                            </div>
                            <div className="ProfileInfo-header-other-info-joined">
                                <img src={theme === "light" ? CalendarLight : CalendarDark} alt="Joined" className="ProfileInfo-header-other-info-joined-icon" />
                                &nbsp;
                                <span className="ProfileInfo-header-other-info-joined-text">
                                    Joined {user.createdAt.toDate().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                                </span>
                            </div>
                            <div className="ProfileInfo-header-other-info-following-followers">
                                <span className="ProfileInfo-header-other-info-following-count">
                                    {user.following.length}
                                </span>
                                &nbsp;
                                <span className="ProfileInfo-header-other-info-following-text">
                                    Following
                                </span>
                                <span className="ProfileInfo-header-other-info-followers-count">
                                    {user.followers.length}
                                </span>
                                &nbsp;
                                <span className="ProfileInfo-header-other-info-followers-text">
                                    Followers
                                </span>
                            </div>
                        </div>
                        <div className="ProfileInfo-header-background">
                            <img src={user.profileBackground} alt="Background" className="ProfileInfo-header-background-image" />
                        </div>
                    </div>
                    <button className="ProfileInfo-header-edit-button" onClick={handleEditProfile}>
                        Edit profile
                    </button>
                </div>
            ))}
            <div className="ProfileInfo-tab-menu">
                <div className={currentTab === 1 ? 'ProfileInfo-tab-menu-posts active-tab' : 'ProfileInfo-tab-menu-posts'} onClick={() => handleTabChange(1)}>
                    Posts
                </div>
                <div className={currentTab === 2 ? 'ProfileInfo-tab-menu-posts-replies active-tab' : 'ProfileInfo-tab-menu-posts-replies'} onClick={() => handleTabChange(2)}>
                    Posts & replies
                </div>
                <div className={currentTab === 3 ? 'ProfileInfo-tab-menu-media active-tab' : 'ProfileInfo-tab-menu-media'} onClick={() => handleTabChange(3)}>
                    Media
                </div>
                <div className={currentTab === 4 ? 'ProfileInfo-tab-menu-likes active-tab' : 'ProfileInfo-tab-menu-likes'} onClick={() => handleTabChange(4)}>
                    Likes
                </div>
            </div>
            <div className="ProfileInfo-tab-content">
                {currentTab === 1 && (
                    <ProfilePost
                        theme={theme}
                        authUser={authUser}
                        currentUID={currentUID}
                    />
                )}
            </div>
        </div>
    );

}
 
export default Profile;