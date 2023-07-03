import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import Menu from "../components/Menu";
import "./styles/Explore.css";
import ExploreFeed from "../components/ExploreFeed";

const Explore = ({
    theme,
    toggleTheme,
    authUser,
    handleLogout,
    showMenu,
    handleShowMenu,
    showMenuRef,
}) => {

    const [publicPosts, setPublicPosts] = useState([]);

    useEffect(() => {
        const getPublicPosts = async () => {
            const publicPostsRef = collection(db, "posts");
            const docRef = query(publicPostsRef, where("postPrivate", "==", false));
            onSnapshot(docRef, (querySnapshot) => {
                const publicPosts = querySnapshot.docs.map((doc) => doc.data());
                setPublicPosts(publicPosts);
            });
        }

        getPublicPosts();

    }, []);

    return ( 
        <div className="Explore">
            <Menu 
                theme={theme}
                toggleTheme={toggleTheme}
                authUser={authUser}
                handleLogout={handleLogout}
                showMenu={showMenu}
                handleShowMenu={handleShowMenu}
                showMenuRef={showMenuRef}
            />
            <ExploreFeed
                theme={theme}
                authUser={authUser}
                publicPosts={publicPosts}
            />
        </div>
    );
}
 
export default Explore;