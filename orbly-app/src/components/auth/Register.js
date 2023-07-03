import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import EyeCloseDark from "../../assets/register/EyeCloseDark.svg";
import EyeCloseLight from "../../assets/register/EyeCloseLight.svg";
import EyeOpenDark from "../../assets/register/EyeOpenDark.svg";
import EyeOpenLight from "../../assets/register/EyeOpenLight.svg";
import "./styles/Register.css";

const Register = ({
    theme,
}) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                photoURL: 'https://i.ibb.co/mBz67t6/User-Default-Image.png',
                displayName: username,
            }).then(() => {
                console.log('profile updated');
                setDoc(doc(db, 'users', user.uid), {
                    email: email,
                    username: username,
                    fullName: fullName,
                    phoneNumber: '',
                    photoURL: 'https://i.ibb.co/mBz67t6/User-Default-Image.png',
                    bio: '',
                    website: '',
                    followers: [],
                    following: [],
                    notifications: [],
                    posts: 0,
                    isVerified: false,
                    isPrivate: false,
                    isSuspended: false,
                    isBanned: false,
                    emailVerified: false,
                    createdAt: new Date(),
                    profileBackground: '',
                    joined: new Date(),
                }).then(() => {
                    sendEmailVerification(auth.currentUser).then(() => {
                        console.log('email verification sent');
                    }).catch((error) => {
                        console.log(error);
                    });
                    console.log('user added to database');
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                console.log(error);
            });
            navigate('/login');
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    return ( 
        <div className="register">
            <div className="register-container">
                <div className="register-container-form-area">
                    <h1 className="register-container-form-title">Register</h1>
                    <form className="register-container-form" onSubmit={handleRegister}>
                        <input className="register-container-form-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className="register-container-form-input" type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        <input className="register-container-form-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <div className="register-container-form-password-area">
                            {passwordShown ? <img className="register-container-form-input-icon" src={theme === "dark" ? EyeOpenDark : EyeOpenLight} alt="EyeClose" onClick={togglePasswordVisiblity} /> : <img className="register-container-form-input-icon" src={theme === "dark" ? EyeCloseDark : EyeCloseLight} alt="EyeOpen" onClick={togglePasswordVisiblity} /> }
                            <input className="register-container-form-input-password" type={passwordShown ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="register-container-form-text-area">
                            <p className="register-container-form-text">By clicking Register, you agree to our <a className="register-container-form-text-link" href="/terms-of-service">Terms of Service</a> and <a className="register-container-form-text-link" href="/privacy-policy">Privacy Policy</a>.</p>
                        </div>
                        <button className="register-container-form-button" type="submit">Register</button>
                    </form>
                    <div className="register-container-form-links">
                        <p className="register-container-form-links-text">Already have an account? <a className="register-container-form-links-link" href="/login">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );

}
 
export default Register;