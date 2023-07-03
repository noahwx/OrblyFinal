import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Explore from './pages/Explore';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';
import Loader from './pages/Loader';
import './App.css';

function App() {

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        console.log("No user");
      }
    });
  }, [auth]);

  const [authUser, setAuthUser] = useState(null);

  const PrivateRoute = ({ children }) => {
    const user = sessionStorage.getItem("user");
  
    if (user) {
      console.log("Yes, user exist");
    } else {
      console.log("No user");
    }
  
    if (!user) {
      return <Navigate to="/" />;
    }
  
    return children;
  };

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      window.localStorage.setItem('theme', 'light');
    }
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
  }, []);
  
  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      window.sessionStorage.removeItem('user');
      window.sessionStorage.removeItem('username');
      window.location.reload();
      Navigate('/');
    }).catch((error) => {
      // An error happened.
      Navigate('/404');
    });
  }

  const [showMenu, setShowMenu] = useState(false);
  const showMenuRef = useRef(showMenu);

  const handleShowMenu = () => {
    setShowMenu(true);
  }

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if(showMenuRef.current && showMenu && !showMenuRef.current.contains(e.target)){
        setShowMenu(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

  }, [showMenuRef, showMenu]);

  return (
    <div className={`App ${theme}`}>
      <Router>
        <Routes>
          <Route path="/" element={
            <Home 
              theme={theme}
              toggleTheme={toggleTheme}
              authUser={authUser}
              handleLogout={handleLogout}
              showMenu={showMenu}
              handleShowMenu={handleShowMenu}
              showMenuRef={showMenuRef}
            />
          } />
          <Route path="/login" element={
            <Login 
              theme={theme}
            />
          } />
          <Route path="/register" element={
            <Register
              theme={theme}
            />
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile
                theme={theme}
                toggleTheme={toggleTheme}
                authUser={authUser}
                handleLogout={handleLogout}
                showMenu={showMenu}
                handleShowMenu={handleShowMenu}
                showMenuRef={showMenuRef}
              />
            </PrivateRoute>
          } />
          <Route path='/notifications' element={
            <PrivateRoute>
              <Notifications
                theme={theme}
                toggleTheme={toggleTheme}
                authUser={authUser}
                handleLogout={handleLogout}
                showMenu={showMenu}
                handleShowMenu={handleShowMenu}
                showMenuRef={showMenuRef}
              />
            </PrivateRoute>
          } />
          <Route path='/explore' element={
            <PrivateRoute>
              <Explore 
                theme={theme}
                toggleTheme={toggleTheme}
                authUser={authUser}
                handleLogout={handleLogout}
                showMenu={showMenu}
                handleShowMenu={handleShowMenu}
                showMenuRef={showMenuRef}
              />
            </PrivateRoute>
          } />
          <Route path="/chat" element={
            <PrivateRoute>
              <Chat 
                theme={theme}
                toggleTheme={toggleTheme}
                authUser={authUser}
                handleLogout={handleLogout}
                showMenu={showMenu}
                handleShowMenu={handleShowMenu}
                showMenuRef={showMenuRef}
              />
            </PrivateRoute>
          } />
          <Route path="/404" element={
            <NotFound
              theme={theme}
            />
          } />
          <Route path="*" element={
            <Loader />
          } />
        </Routes>
      </Router>
    </div>
  );

}

export default App;
