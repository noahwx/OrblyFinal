import React from "react";
import "./styles/NotFound.css";

const NotFound = ({
    theme,
}) => {
    return ( 
        <div className="NotFound">
            <h1 className="NotFound-header">404</h1>
            <h2 className="NotFound-subheader">Page Not Found</h2>
            <a href="/" className="NotFound-link">Go Home</a>
        </div>
    );
}
 
export default NotFound;