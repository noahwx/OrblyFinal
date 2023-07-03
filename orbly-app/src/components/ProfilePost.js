import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, where } from "firebase/firestore";
import PostMenuDark from "../assets/post/PostMenuDark.svg";
import PostMenuLight from "../assets/post/PostMenuLight.svg";
import CommentDark from "../assets/post/CommentDark.svg";
import CommentLight from "../assets/post/CommentLight.svg";
import RepostDark from "../assets/post/RepostDark.svg";
import RepostLight from "../assets/post/RepostLight.svg";
import LikeDark from "../assets/post/LikeDark.svg";
import LikeLight from "../assets/post/LikeLight.svg";
import ShareDark from "../assets/post/ShareDark.svg";
import ShareLight from "../assets/post/ShareLight.svg";
import SeenDark from "../assets/post/SeenDark.svg";
import SeenLight from "../assets/post/SeenLight.svg";
import "./styles/ProfilePost.css";

const ProfilePost = ({
    theme,
    authUser,
    currentUID,
}) => {

    const [usersPosts, setUsersPosts] = useState([]);

    useEffect(() => {
        const getUsersPosts = async () => {
            const postsRef = collection(db, "posts");
            const postsq = where("postUserID", "==", currentUID);
            onSnapshot(postsRef, postsq, (querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push(doc.data());
                });

                setUsersPosts(data);
            });
        }

        getUsersPosts();

    }, [currentUID]);

    const postDate = (post) => {
        const datePosted = new Date(post.postDate.toDate());
        const datePostedDifference = Date.now() - datePosted;
        const datePostedDifferenceSeconds = datePostedDifference / 6000;
        const timeSincePost = Math.floor(datePostedDifferenceSeconds);
        if (timeSincePost < 60) {
            return timeSincePost + 's';
        } else if (timeSincePost >= 60 && timeSincePost < 1440) {
            return Math.floor(timeSincePost / 60) + 'm';
        } else if (timeSincePost >= 1440 && timeSincePost < 10080) {
            return Math.floor(timeSincePost / 1440) + 'h';
        } else if (timeSincePost >= 10080 && timeSincePost < 40320) {
            return Math.floor(timeSincePost / 10080) + 'd';
        } else if (timeSincePost >= 40320 && timeSincePost < 483840) {
            return Math.floor(timeSincePost / 40320) + 'w';
        } else if (timeSincePost >= 483840) {
            return Math.floor(timeSincePost / 483840) + 'm';
        } else {
            return timeSincePost + 's';
        }
    }

    const handlePostText = (post) => {
        if (post.postText.includes('#')) {
            const postTextSplit = post.postText.split(' ');
            const postTextSplitMap = postTextSplit.map((word) => {
                if (word.startsWith('#')) {
                    return (
                        <span className="Post-body-text-content-hashtag">{word}</span>
                    )
                } else {
                    return (
                        <span>{word} </span>
                    )
                }
            })
            return postTextSplitMap;
        } else if (post.postText.includes('@')) {
            const postTextSplit = post.postText.split(' ');
            const postTextSplitMap = postTextSplit.map((word) => {
                if (word.startsWith('@')) {
                    return (
                        <span className="Post-body-text-content-mention">{word}</span>
                    )
                } else {
                    return (
                        <span>{word} </span>
                    )
                }
            })
            return postTextSplitMap;
        } else if (post.postText.includes('https://') || post.postText.includes('http://')) {
            const postTextSplit = post.postText.split(' ');
            const postTextSplitMap = postTextSplit.map((word) => {
                if (word.startsWith('https://') || word.startsWith('http://')) {
                    return (
                        <a target="_blank" rel="noopener noreferrer" href={post.postText} className="Post-body-text-content-link">{word}</a>
                    )
                } else {
                    return (
                        <span>{word} </span>
                    )
                }
            })
            return postTextSplitMap;
        } else {
            return post.postText;
        }
    }

    return ( 
        <div className="ProfilePost">
            {usersPosts.sort((a, b) => b.postTimestamp - a.postTimestamp).filter((post) => post.postUserID === currentUID).map((post) => (
                <div className="ProfilePost-container" key={post.id}>
                    <div className="ProfilePost-container-header">
                        <div className="ProfilePost-container-header-profile-picture">
                            <img src={post.postAuthorImage} alt="Profile" className="ProfilePost-container-header-profile-picture-user" />
                        </div>
                        <div className="ProfilePost-container-header-info">
                            <div className="ProfilePost-container-header-info-fullName">
                                {post.postUserFullname}
                            </div>
                            &nbsp;
                            <div className="ProfilePost-container-header-info-username">
                                @{post.postUser}
                            </div>
                            &nbsp;
                            <div className="ProfilePost-container-header-info-date">
                                {postDate(post)}
                            </div>
                        </div>
                        <div className="ProfilePost-container-header-menu">
                            <img src={theme === "dark" ? PostMenuDark : PostMenuLight} alt="Menu" className="ProfilePost-container-header-menu-icon" />
                        </div>
                    </div>
                    <div className="ProfilePost-container-body">
                        <div className="ProfilePost-container-body-text">
                            {handlePostText(post)}
                        </div>
                        <div className="ProfilePost-container-body-actions">
                            <div className="ProfilePost-container-body-actions-like">
                                <img src={theme === "dark" ? LikeDark : LikeLight} alt="Like" className="ProfilePost-container-body-actions-like-icon" />
                                <span className="ProfilePost-container-body-actions-like-text">
                                    {post.postLikes.length > 0 ? post.postLikes.length : null}
                                </span>
                            </div>
                            <div className="ProfilePost-container-body-actions-comment">
                                <img src={theme === "dark" ? CommentDark : CommentLight} alt="Comment" className="ProfilePost-container-body-actions-comment-icon" />
                                <span className="ProfilePost-container-body-actions-comment-text">
                                    {post.postComments.length > 0 ? post.postComments.length : null}
                                </span>
                            </div>
                            <div className="ProfilePost-container-body-actions-repost">
                                <img src={theme === "dark" ? RepostDark : RepostLight} alt="Repost" className="ProfilePost-container-body-actions-repost-icon" />
                                <span className="ProfilePost-container-body-actions-repost-text">
                                    {post.postReposts.length > 0 ? post.postReposts.length : null}
                                </span>
                            </div>
                            <div className="ProfilePost-container-body-actions-seen">
                                <img src={theme === "dark" ? SeenDark : SeenLight} alt="Seen" className="ProfilePost-container-body-actions-seen-icon" />
                                <span className="ProfilePost-container-body-actions-seen-text">
                                    {post.postSeen.length > 0 ? post.postSeen.length : null}
                                </span>
                            </div>
                            <div className="ProfilePost-container-body-actions-share">
                                <img src={theme === "dark" ? ShareDark : ShareLight} alt="Share" className="ProfilePost-container-body-actions-share-icon" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
 
export default ProfilePost;