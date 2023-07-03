import React, { useState, useRef, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, setDoc, updateDoc, where, increment, doc, query } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import PhotoDark from "../assets/post/PhotoDark.svg";
import PhotoLight from "../assets/post/PhotoLight.svg";
import PostImage from "./modals/PostImage";
import DeleteDark from "../assets/post/DeleteDark.svg";
import DeleteLight from "../assets/post/DeleteLight.svg";
import GifIconDark from "../assets/post/GifIconDark.svg";
import GifIconLight from "../assets/post/GifIconLight.svg";
import "./styles/NewPost.css";
import PostGIF from "./modals/PostGIF";

const NewPost = ({
    theme,
    authUser,
}) => {

    const navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);
    const isActiveRef = useRef(isActive);
    const [charCount, setCharCount] = useState(0);
    const [postText, setPostText] = useState('');
    const [postImage, setPostImage] = useState('');
    const [postGIF, setPostGIF] = useState('');
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {

        const getUserInfo = async () => {
            const userRef = collection(db, "users");
            const docRef = query(userRef, where("username", "==", authUser?.displayName));
            onSnapshot(docRef, (querySnapshot) => {
                const userInfo = [];
                querySnapshot.forEach((doc) => {
                    userInfo.push(doc.data());
                    setUserInfo(doc.data());
                });
            });
        }

        getUserInfo();

    }, [authUser]);

    const handleIsActive = () => {
        setIsActive(true);
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(isActiveRef.current && isActive && !isActiveRef.current.contains(e.target)){
              setIsActive(false)
              setPostText('');
              setCharCount(0);
            }
        }
      
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

    }, [isActiveRef, isActive]);

    const auto_grow = () => {
        if (postImage)  {
            const textarea = document.querySelector('.NewPost-image-added-textarea-active');
            textarea.style.height = "5px";
            textarea.style.height = (textarea.scrollHeight)+"px";
        } else if (postGIF) {
            const textarea = document.querySelector('.NewPost-image-added-textarea-active');
            textarea.style.height = "5px";
            textarea.style.height = (textarea.scrollHeight)+"px";
        }
        else {
            const textarea = document.querySelector('.NewPost-textarea-active');
            textarea.style.height = "5px";
            textarea.style.height = (textarea.scrollHeight)+"px";
        }
    }

    const handlePost = (e) => {
        e.preventDefault();
        const postID = uuidv4();
        const postDate = new Date();

        const post = {
            postID: postID,
            postText: postText,
            postDate: postDate,
            postLikes: [],
            postComments: [],
            postSeen: [],
            postUser: authUser?.displayName,
            postUserFullname: userInfo.fullName,
            postUserID: authUser?.uid,
            postUserVerified: userInfo.isVerified,
            postImage: postImage,
            postTimestamp: Date.now(),
            postPrivate: userInfo.isPrivate,
            postAuthorImage: userInfo.photoURL,
            postReposts: [],
            postGIF: postGIF,
        }

        setDoc(doc(db, 'posts', postID), post);

        const userRef = doc(db, 'users', authUser?.uid);
        updateDoc(userRef, {
            posts: increment(1),
        });

        setIsActive(false);
        setPostText('');
        setCharCount(0);
        setPostImage('');
        setPostGIF('');
    }   

    const [isImage, setIsImage] = useState(false);
    const isImageRef = useRef(isImage);

    const handleIsImage = () => {
        setIsImage(true);
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(isImageRef.current && isImage && !isImageRef.current.contains(e.target)){
                setIsImage(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

    }, [isImageRef, isImage]);

    const [isGIF, setIsGIF] = useState(false);
    const isGIFRef = useRef(isGIF);

    const handleIsGIF = () => {
        setIsGIF(true);
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(isGIFRef.current && isGIF && !isGIFRef.current.contains(e.target)){
                setIsGIF(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

    }, [isGIFRef, isGIF]);

    console.log(postGIF);

    return ( 
        <div 
            className={isActive ? 
                postImage ?
                    'NewPost-image-active'
                : postGIF ?
                    'NewPost-gif-active'
                : 'NewPost-active'
            : 'NewPost-unactive'
            } 
        onClick={handleIsActive} ref={isActiveRef}>
            <div className={
                isActive ?
                    postImage ?
                        'NewPost-image-added-profile-image-active'
                    : postGIF ?
                        'NewPost-image-added-profile-image-active'
                    : 'NewPost-profile-image-active'
                : 'NewPost-profile-image-unactive'
            } onClick={() => navigate('/profile')}>
                <img src={authUser?.photoURL} alt="Profile" className="NewPost-profile-user-image"/>
            </div>
            <textarea className={
                isActive ?
                    postImage ?
                        'NewPost-image-added-textarea-active'
                    : postGIF ?
                        'NewPost-image-added-textarea-active'
                    : 'NewPost-textarea-active'
                : 'NewPost-textarea-unactive'
            } placeholder="What's on your mind?" value={postText} onInput={() => auto_grow()} maxLength={270} onChange={(e) => {setCharCount(e.target.value.length); setPostText(e.target.value)}}
                style={{
                    color: `${charCount === 270 ? 'var(--_error)' : 'var(--_text)'}`,
                }}
            />
            <div className={isActive ? postImage ? 'NewPost-User-Post-active' : 'NewPost-User-Post-no-image-active' : 'NewPost-User-Post-unactive'}>
                <div className="NewPost-User-Post-delete-image">
                    <img src={theme === 'light' ? DeleteLight : DeleteDark} alt="Delete" className="NewPost-User-Post-delete-image-icon" onClick={() => setPostImage('')}/>
                </div>
                {postImage ?
                    <img src={postImage} alt="Post_Image" className="NewPost-User-Post-image"/>
                : null}
            </div>
            <div className={isActive ? postGIF ? 'NewPost-User-Post-active' : 'NewPost-User-Post-no-image-active' : 'NewPost-User-Post-unactive'}>
                <div className="NewPost-User-Post-delete-image">
                    <img src={theme === 'light' ? DeleteLight : DeleteDark} alt="Delete" className="NewPost-User-Post-delete-image-icon" onClick={() => setPostGIF('')}/>
                </div>
                {postGIF ?
                    <img src={postGIF} alt="Post_GIF" className="NewPost-User-Post-gif"/>
                : null}
            </div>
            <div className={
                isActive ?
                    postImage ?
                        'NewPost-image-actions-active'
                    : postGIF ?
                        'NewPost-image-actions-active'
                    : 'NewPost-actions-active'
                : 'NewPost-actions-unactive'
            }>
                {isActive ?
                    <div className="NewPost-actions-profile-post-options">
                        <div className="NewPost-actions-profile-post-option" onClick={handleIsImage}
                            style={{
                                opacity: `${postGIF ? '0.5' : '1'}`,
                                pointerEvents: `${postGIF ? 'none' : 'auto'}`,
                            }}
                        >
                            <img src={theme === 'light' ? PhotoLight : PhotoDark} alt="Post-option" className="NewPost-actions-profile-post-option-image" />
                            <p className="NewPost-actions-profile-post-option-tooltip">Photo</p>
                        </div>
                        <div className="NewPost-actions-profile-post-option" onClick={handleIsGIF}
                            style={{
                                opacity: `${postImage ? '0.5' : '1'}`,
                                pointerEvents: `${postImage ? 'none' : 'auto'}`,
                            }}
                        >
                            <img src={theme === 'light' ? GifIconLight : GifIconDark} alt="Post-option" className="NewPost-actions-profile-post-option-image" />
                            <p className="NewPost-actions-profile-post-option-tooltip-gif">GIF</p>
                        </div>
                    </div>
                : null
                }
                {isActive ?
                    <div className="NewPost-actions-progress">
                        <div className="NewPost-actions-progress-circle-area">
                            <div className="NewPost-actions-progress-circle"
                                style={{
                                    background: `conic-gradient(${`${charCount > 250 ? charCount === 270 ? 'var(--_error)' : 'var(--_middle)' : 'var(--_primary)'}`} ${charCount/270*100}%, var(--_page-background) 0%)`,
                                    transform: charCount > 250 ? `scale(${1.1})` : `scale(${1})`,
                                }}
                            >
                                <div className="NewPost-actions-progress-circle-inner"></div>
                            </div>
                        </div>
                        <div className="NewPost-actions-progress-count">
                            <p className="NewPost-char-count"
                                style={{
                                    color: `${charCount > 250 ? charCount === 270 ? 'var(--_error)' : 'var(--_middle)' : 'var(--_primary)'}`,
                                }}
                            >{charCount}/270</p>
                        </div>
                    </div>
                : null
                }
                <button className={isActive ? 'NewPost-button-active' : 'NewPost-button-unactive'}
                    style={{
                        backgroundColor: `${`${charCount === 270 ? 'var(--_grey)' : ''}`}`,
                        cursor: `${`${charCount === 270 ? 'not-allowed' : 'pointer'}`}`,
                    }}
                    disabled={charCount === 270 ? true : false}
                    onClick={(e) => {handlePost(e); setIsActive(false); setPostText(''); setIsImage(false); setPostImage(''); setIsGIF(false); setPostGIF(''); setCharCount(0);}}
                >Post</button>
            </div>
            {isImage && isActive ?
                <PostImage
                    theme={theme}
                    isImage={isImage}
                    setIsImage={setIsImage}
                    isImageRef={isImageRef}
                    postImage={postImage}
                    setPostImage={setPostImage}
                />
            : null
            }
            {isGIF && isActive ?
                <PostGIF
                    theme={theme}
                    isGIF={isGIF}
                    setIsGIF={setIsGIF}
                    isGIFRef={isGIFRef}
                    postGIF={postGIF}
                    setPostGIF={setPostGIF}
                />
            : null
            }
        </div>
    );

}
 
export default NewPost;