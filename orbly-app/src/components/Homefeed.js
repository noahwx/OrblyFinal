import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import NewPost from "./NewPost";
import "./styles/Homefeed.css";
import Post from "./Post";

const Homefeed = ({
    theme,
    authUser
}) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
          const postRef = collection(db, 'posts');
          onSnapshot(postRef, (snapshot) => {
            const posts = snapshot.docs.map(doc => doc.data());
            setPosts(posts);
          });
        }
        getPosts();
    }, []);

    return ( 
        <div className="Homefeed">
            <div className="Homefeed-header">
                <h1 className="Homefeed-title">Home</h1>
            </div>
            <div className="Homefeed-NewPost">
                {authUser ? 
                    <NewPost 
                        theme={theme}
                        authUser={authUser}
                    />
                : null
                }
            </div>
            <div className="Homefeed-body">
                <Post 
                    theme={theme}
                    authUser={authUser}
                    posts={posts}
                />
            </div>
        </div>
    );
}
 
export default Homefeed;