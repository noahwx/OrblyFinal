import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import EyeCloseDark from "../../assets/login/EyeCloseDark.svg";
import EyeCloseLight from "../../assets/login/EyeCloseLight.svg";
import EyeOpenDark from "../../assets/login/EyeOpenDark.svg";
import EyeOpenLight from "../../assets/login/EyeOpenLight.svg";
import "./styles/Login.css";

const Login = ({
    theme,
}) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user.uid);
                if (user.emailVerified === false) {
                    alert('Please verify your email.');
                    return;
                } else if (user.emailVerified === true) {
                    console.log('email verified');
                    window.sessionStorage.setItem('user', JSON.stringify(user.uid));
                    window.sessionStorage.setItem('username', JSON.stringify(user.displayName));
                    updateDoc(doc(db, 'users', user.uid), {
                        emailVerified: true,
                    }).then(() => {
                        console.log('email verified');
                    }).catch((error) => {
                        console.log(error);
                    });
                    navigate('/');
                } else {
                    console.log('email not verified');
                }
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const [passwordVisible, setPasswordVisible] = useState(false);

    return ( 
        <div className="Login">
            <div className="Login-container">
                <div className="Login-container-form-area">
                    <h1 className="Login-container-form-title">Login</h1>
                    <form className="Login-container-form" onSubmit={handleLogin}>
                        <input className="Login-container-form-input" type="text" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <div className="Login-container-form-password-area">
                            {passwordVisible ? <img className="Login-container-form-input-icon" src={theme === "dark" ? EyeOpenDark : EyeOpenLight} alt="EyeClose" onClick={() => setPasswordVisible(!passwordVisible)} /> : <img className="Login-container-form-input-icon" src={theme === "dark" ? EyeCloseDark : EyeCloseLight} alt="EyeOpen" onClick={() => setPasswordVisible(!passwordVisible)} />   }
                            <input className="Login-container-form-input" type={passwordVisible ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className="Login-container-form-button" type="submit">Login</button>
                    </form>
                    <div className="Login-container-form-links">
                        <a className="Login-container-form-links-link" href="/register">Register</a>
                        <a className="Login-container-form-links-link" href="/forgot-password">Forgot Password</a>
                    </div>
                </div>
            </div>
        </div>
    );

}
 
export default Login;