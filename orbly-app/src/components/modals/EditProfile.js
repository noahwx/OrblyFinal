import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, where, onSnapshot, updateDoc, writeBatch, doc, getDocs } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import DeleteDark from "../../assets/profile/editprofile/DeleteDark.svg";
import DeleteLight from "../../assets/profile/editprofile/DeleteLight.svg";
import PlusDark from "../../assets/profile/editprofile/PlusDark.svg";
import PlusLight from "../../assets/profile/editprofile/PlusLight.svg";
import "./styles/EditProfile.css";

const EditProfile = ({
    theme,
    authUser,
    editProfile,
    editProfileRef,
    handleEditProfile,
    setEditProfile,
    handleChangeProfilePhoto,
    changeProfilePhoto,
}) => {

    const currentUser = window.sessionStorage.getItem("username").replace(/"/g, "");
    const uid = sessionStorage.getItem("user").replace(/['"]+/g, '');

    const [userInfo, setUserInfo] = useState([]);
    const [currentFullName, setCurrentFullName] = useState("");
    const [currentUsername, setCurrentUsername] = useState("");
    const [currentBio, setCurrentBio] = useState("");
    const [currentLocation, setCurrentLocation] = useState("");
    const [currentWebsite, setCurrentWebsite] = useState("");
    const [currentProfilePhotoURL, setCurrentProfilePhotoURL] = useState("");
    const [currentProfileBackground, setCurrentProfileBackground] = useState("");

    useEffect(() => {

        const getUserInfo = async () => {
            const userRef = collection(db, "users");
            const docRef = query(userRef, where("username", "==", currentUser));
            onSnapshot(docRef, (querySnapshot) => {
                const userInfo = [];
                querySnapshot.forEach((doc) => {
                    userInfo.push(doc.data());
                });
                setUserInfo(userInfo);
            });
        }

        getUserInfo();

    }, [currentUser]);

    useEffect(() => {
        const linkUserInfo = () => {
            userInfo.map((user) => {
                return (
                    setCurrentFullName(user.fullName),
                    setCurrentUsername(user.username),
                    setCurrentBio(user.bio),
                    setCurrentLocation(user.location),
                    setCurrentWebsite(user.website),
                    setCurrentProfilePhotoURL(user.photoURL),
                    setCurrentProfileBackground(user.profileBackground)
                );
            });
        }

        linkUserInfo();

    }, [userInfo]);

    const [name, setName] = useState(currentFullName);
    const [username, setUsername] = useState(currentUsername);
    const [bio, setBio] = useState(currentBio);
    const [location, setLocation] = useState(currentLocation);
    const [website, setWebsite] = useState(currentWebsite);
    const [profilePhotoURL, setProfilePhotoURL] = useState(currentProfilePhotoURL);
    const [profileBackground, setProfileBackground] = useState(currentProfileBackground);

    const handleProfileChange = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: username ? username : authUser?.displayName,
            photoURL: profilePhotoURL ? profilePhotoURL : authUser?.photoURL,
        }).then(() => {
            console.log("Profile updated!");
        }).catch((error) => {
            console.log(error);
        });
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
            fullName: name ? name : currentFullName,
            username: username ? username : currentUsername,
            bio: bio ? bio : currentBio,
            location: location ? location : currentLocation,
            website: website ? website : currentWebsite,
            photoURL: profilePhotoURL ? profilePhotoURL : currentProfilePhotoURL,
            profileBackground: profileBackground ? profileBackground : currentProfileBackground,
        }).then(() => {
            console.log("Document successfully updated!");
        }).catch((error) => {
            console.log(error);
        });
        const batch = writeBatch(db);
        const postRef = collection(db, "posts");
        const q = query(postRef, where("postUserID", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            batch.update(doc.ref, {
                postUser: username ? username : currentUsername,
                postUserFullname: name ? name : currentFullName,
                postAuthorImage: profilePhotoURL ? profilePhotoURL : currentProfilePhotoURL,
            });
        });
        await batch.commit().then(() => {
            console.log('user posts updated');
        }).catch((error) => {
            console.log(error);
        });
        window.sessionStorage.setItem("username", JSON.stringify(
            username ? username : currentUsername
        ));
        window.location.reload();
    }

    const handleProfilePhotoFocus = () => {
        document.getElementById("photo").focus();
    }

    const handleProfileBackgroundFocus = () => {
        document.getElementById("background").focus();
    }

    return ( 
        <div className="EditProfile">
            <div className="EditProfile-modal" ref={editProfileRef}>
                <div className="EditProfile-modal-header">
                    <span className="EditProfile-modal-close" onClick={() => setEditProfile(false)}>
                        X
                    </span>
                    <h1 className="EditProfile-modal-title">
                        Edit Profile
                    </h1>
                    <button className="EditProfile-modal-save" onClick={(e) => {handleProfileChange(e); setEditProfile(false)}}>
                        Save
                    </button>
                </div>
                <div className="EditProfile-modal-body">
                    <div className="EditProfile-modal-body-header">
                        <div className="EditProfile-modal-body-header-avatar">
                            <div className="EditProfile-modal-body-header-avatar-icon" onClick={handleChangeProfilePhoto}>
                                <img src={theme === "light" ? PlusLight : PlusDark} alt="Change Avatar" className="EditProfile-modal-body-header-avatar-icon-img" onClick={handleProfilePhotoFocus} />
                            </div>
                            <div className="EditProfile-modal-body-header-avatar-overlay"></div>
                            <img src={currentProfilePhotoURL} alt="Avatar" className="EditProfile-modal-body-header-avatar-user" />
                        </div>
                        <div className="EditProfile-modal-body-header-background">
                            <div className="EditProfile-modal-body-header-background-icon">
                                <img src={theme === "light" ? PlusLight : PlusDark} alt="Change Background" className="EditProfile-modal-body-header-background-icon-img" onClick={handleProfileBackgroundFocus} />
                                <img src={theme === "light" ? DeleteLight : DeleteDark} alt="Delete Background" className="EditProfile-modal-body-header-background-icon-img" />
                            </div>
                            <div className="EditProfile-modal-body-header-background-overlay"></div>
                            <img src={currentProfileBackground} alt="Background" className="EditProfile-modal-body-header-background-user" />
                        </div>
                    </div>
                    <div className="EditProfile-modal-body-info">
                        <div className="EditProfile-modal-body-info-name">
                            <input type="text" placeholder={currentFullName} value={name} onChange={(e) => setName(e.target.value)} onBlur={() => setName(name === currentFullName ? currentFullName : name)} className="EditProfile-modal-body-info-name-input" />
                        </div>
                        <div className="EditProfile-modal-body-info-username">
                            <input type="text" placeholder={currentUsername} value={username} onChange={(e) => setUsername(e.target.value)} onBlur={() => setUsername(username === currentUsername ? currentUsername : username)} className="EditProfile-modal-body-info-username-input" />
                        </div>
                        <div className="EditProfile-modal-body-info-bio">
                            <textarea placeholder={currentBio} value={bio} onChange={(e) => setBio(e.target.value)} onBlur={() => setBio(bio === currentBio ? currentBio : bio)} className="EditProfile-modal-body-info-bio-input" />
                        </div>
                        <div className="EditProfile-modal-body-info-location">
                            <input type="text" placeholder={currentLocation} value={location} onChange={(e) => setLocation(e.target.value)} onBlur={() => setCurrentLocation(location === currentLocation ? location : currentLocation)} className="EditProfile-modal-body-info-location-input" />
                        </div>
                        <div className="EditProfile-modal-body-info-website">
                            <input type="text" placeholder={currentWebsite} value={website} onChange={(e) => setWebsite(e.target.value)} onBlur={() => setCurrentWebsite(website === currentWebsite ? website : currentWebsite)} className="EditProfile-modal-body-info-website-input" />
                        </div>
                        <div className="EditProfile-modal-body-info-photo">
                            <input type="text" id='photo' placeholder={currentProfilePhotoURL} value={profilePhotoURL} onChange={(e) => setProfilePhotoURL(e.target.value)} onBlur={() => setCurrentProfilePhotoURL(profilePhotoURL === currentProfilePhotoURL ? profilePhotoURL : currentProfilePhotoURL)} className="EditProfile-modal-body-info-photo-input" />
                        </div>
                        <div className="EditProfile-modal-body-info-background">
                            <input type="text" id='background' placeholder={currentProfileBackground} value={profileBackground} onChange={(e) => setProfileBackground(e.target.value)} onBlur={() => setCurrentProfileBackground(profileBackground === currentProfileBackground ? profileBackground : currentProfileBackground)} className="EditProfile-modal-body-info-background-input" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
 
export default EditProfile;