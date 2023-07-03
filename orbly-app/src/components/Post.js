import React from "react";
import CommentDark from "../assets/post/CommentDark.svg";
import CommentLight from "../assets/post/CommentLight.svg";
import LikeDark from "../assets/post/LikeDark.svg";
import LikeLight from "../assets/post/LikeLight.svg";
import ShareDark from "../assets/post/ShareDark.svg";
import ShareLight from "../assets/post/ShareLight.svg";
import PostMenuDark from "../assets/post/PostMenuDark.svg";
import PostMenuLight from "../assets/post/PostMenuLight.svg";
import RepostDark from "../assets/post/RepostDark.svg";
import RepostLight from "../assets/post/RepostLight.svg";
import SeenDark from "../assets/post/SeenDark.svg";
import SeenLight from "../assets/post/SeenLight.svg";
import "./styles/Post.css";

const Post = ({
    theme,
    authUser,
    posts,
}) => {

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
        <>
            {posts.sort((a, b) => b.postTimestamp - a.postTimestamp).map((post) => (
                <div className={
                    post.postImage ?
                        post.postGIF ?
                            'Post-w-image-w-GIF'
                        : 'Post-w-image'
                    : post.postGIF ?
                        'Post-w-GIF'
                    : 'Post'
                } key={post.postID}>
                    <div className="Post-header">
                        <div className="Post-header-avatar">
                            <img className="Post-header-avatar-image" src={post.postAuthorImage} alt="avatar" />
                        </div>
                        &nbsp;
                        <div className="Post-header-important-text">
                            <div className="Post-header-fullName">
                                <h3 className="Post-header-fullName-text">{post.postUserFullname}</h3>
                            </div>
                            &nbsp;
                            <div className="Post-header-username-at">
                                <h3 className="Post-header-username-at-text">@{post.postUser}</h3>
                            </div>
                            &nbsp;
                            <div className="Post-header-date">
                                <h3 className="Post-header-date-text">{
                                    postDate(post)
                                }</h3>
                            </div>
                        </div>
                        <div className="Post-header-menu">
                            <img className="Post-header-menu-image" src={theme === 'light' ? PostMenuLight : PostMenuDark} alt="menu" />
                        </div>
                    </div>
                    <div className="Post-body">
                        <div className="Post-body-text">
                            <p className="Post-body-text-content">
                                {handlePostText(post)}
                            </p>
                        </div>
                        {post.postImage ? 
                            <div className="Post-body-image">
                                <img className="Post-body-image-content" src={post.postImage} alt="post" />
                            </div>
                        : null}
                        {post.postGIF ?
                            <div className="Post-body-gif">
                                <img className="Post-body-gif-content" src={post.postGIF} alt="post" />
                            </div>
                        : null}
                    </div>
                    <div className="Post-actions">
                        <div className="Post-actions-like">
                            <img className="Post-actions-like-image" src={theme === 'light' ? LikeLight : LikeDark} alt="like" />
                            <h3 className="Post-actions-like-text">
                                {post.postLikes.length > 0 ? post.postLikes.length : null}    
                            </h3>
                        </div>
                        <div className="Post-actions-comment">
                            <img className="Post-actions-comment-image" src={theme === 'light' ? CommentLight : CommentDark} alt="comment" />
                            <h3 className="Post-actions-comment-text">
                                {post.postComments.length > 0 ? post.postComments.length : null}    
                            </h3>
                        </div>
                        <div className="Post-actions-repost">
                            <img className="Post-actions-repost-image" src={theme === 'light' ? RepostLight : RepostDark} alt="repost" />
                            <h3 className="Post-actions-repost-text">
                                {post.postReposts.length > 0 ? post.postReposts.length : null}
                            </h3>
                        </div>
                        <div className="Post-actions-seen">
                            <img className="Post-actions-seen-image" src={theme === 'light' ? SeenLight : SeenDark} alt="seen" />
                            <h3 className="Post-actions-seen-text">
                                {post.postSeen.length > 0 ? post.postSeen.length : null}
                            </h3>
                        </div>
                        <div className="Post-actions-share">
                            <img className="Post-actions-share-image" src={theme === 'light' ? ShareLight : ShareDark} alt="share" />
                        </div>
                    </div>
                </div>    
            ))}
        </>
    );
}
 
export default Post;