import React from "react";
import "./styles/PostGIF.css";

const PostGIF = ({
    theme,
    isGIF,
    setIsGIF,
    isGIFRef,
    postGIF,
    setPostGIF,
}) => {



    return ( 
        <div className="PostGIF">
            {isGIF && (
                <div className="PostGIF-modal" ref={isGIFRef}>
                    <div className="PostGIF-modal-content">
                        <div className="PostGIF-modal-content-header">
                            <h3 className="PostGIF-modal-content-header-title">Post GIF</h3>
                            <button className="PostGIF-modal-content-header-close" onClick={() => {setIsGIF(false); setPostGIF('')}}>X</button>
                        </div>
                        <div className="PostGIF-modal-content-body">
                            <input type="text" className="PostGIF-modal-content-body-input" placeholder="GIF URL" value={postGIF} onChange={(e) => setPostGIF(e.target.value)}/>
                        </div>
                        <div className="PostGIF-modal-content-footer">
                            <button className="PostGIF-modal-content-footer-button-cancel" onClick={() => {setIsGIF(false); setPostGIF('')}}>Cancel</button>
                            <button className="PostGIF-modal-content-footer-button-post" onClick={() => {setIsGIF(false)}}>Add GIF</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}
 
export default PostGIF;