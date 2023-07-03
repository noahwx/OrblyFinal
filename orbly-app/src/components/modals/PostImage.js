import React from "react";
import "./styles/PostImage.css";

const PostImage = ({
    theme,
    isImage,
    setIsImage,
    isImageRef,
    postImage,
    setPostImage,
}) => {

    return ( 
        <div className="PostImage">
            {isImage && (
                <div className="PostImage-modal" ref={isImageRef}>
                    <div className="PostImage-modal-content">
                        <div className="PostImage-modal-content-header">
                            <h3 className="PostImage-modal-content-header-title">Post Image</h3>
                            <button className="PostImage-modal-content-header-close" onClick={() => {setIsImage(false); setPostImage('')}}>X</button>
                        </div>
                        <div className="PostImage-modal-content-body">
                            <input type="text" className="PostImage-modal-content-body-input" placeholder="Image URL" value={postImage} onChange={(e) => setPostImage(e.target.value)}/>
                        </div>
                        <div className="PostImage-modal-content-footer">
                            <button className="PostImage-modal-content-footer-button-cancel" onClick={() => {setIsImage(false); setPostImage('')}}>Cancel</button>
                            <button className="PostImage-modal-content-footer-button-post" onClick={() => {setIsImage(false)}}>Add Image</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}
 
export default PostImage;