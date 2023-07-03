import React from "react";
import "./styles/Loader.css";

const Loader = () => {

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            // window.location.reload();
        }, 1000);
    }, []);

    console.log(loading);

    return (  
        <div className="loader-container">
            <h1 className="loader-header">Orbly</h1>
            <div className="loader">
                <div className="loader-spinner"></div> 
            </div>
        </div>
    );

}
 
export default Loader;