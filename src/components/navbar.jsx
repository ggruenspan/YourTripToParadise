import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import UserDataService from '../assets/js/service.js';
import '../assets/css/navBarStyle.css';
import logo from '../assets/images/logo.png';
import { FaUserAlt, FaCaretDown, FaCaretLeft, FaSuitcase, FaHeart } from 'react-icons/fa';
import { FaGear, FaArrowRightFromBracket } from 'react-icons/fa6';

function NavBar() {
    const currentPath = window.location.pathname;
    const [session, setSession] = useState(null);
    const [userName, setUserName] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isContentOpen, setIsContentOpen] = useState(false);

    useEffect(() => {
        handleUserData();
        handleWindowResize();

        document.addEventListener('mouseup', handleDocumentClick);
        window.addEventListener('resize', handleWindowResize);

        return () => {
            document.removeEventListener('mouseup', handleDocumentClick);
            window.addEventListener('resize', handleWindowResize);
        };
    }, []);

    const isActive = (path) => {
        return currentPath === path ? 'active' : '';
    };

    const handleUserData = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                const decodedToken = jwtDecode(token);
                // console.log(decodedToken);
                if (decodedToken.exp * 1000 > (Date.now()+ (60 * 60 * 1000))) {
                    // console.log("alive");
                    setSession(true);
                    setUserName(decodedToken.userName);
                } else {
                    // console.log("dead");
                    localStorage.removeItem('jwtToken');
                    setSession(false);
                    setUserName('');
                    setTimeout(() => { window.location.replace('/'); }, 0);
                }
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    };

    const handleSignOut = async () => {
        UserDataService.signOut()
        .then((response) => {
            // console.log(response);
            localStorage.removeItem('jwtToken');
            setSession(null);
            setUserName('');
            setTimeout(() => { window.location.replace('/'); }, 0);
        })
        .catch((error) => {
            console.error('Error decoding token:', error);
        })
    }

    const toggleButton = () => {
        setIsMenuOpen(prevState => !prevState);
        const navBarCollapse = document.getElementById('navBar-collapse');
        const body = document.getElementsByTagName('body')[0];
        const icon = document.getElementsByClassName('icon');
        if (navBarCollapse) {
            navBarCollapse.style.display = !isMenuOpen ? 'flex' : '';
            body.style.overflowY = !isMenuOpen ? 'hidden' : 'auto';
            for(let i = 0; i < icon.length; i++) {
                icon[i].id = !isMenuOpen ? 'menuOpen' : '';
            }
        }
    };
    
    const toggleContent = () => {
        setIsContentOpen(prevState => !prevState);
        const content = document.getElementById('content');
        content.style.display = content.style.display === '' ? 'block' : '';
    };

    const handleDocumentClick = (e) => {
        const content = document.getElementById('content');
        if (
            !e.target.classList.contains('btn-toggle') &&
            content.style.display == 'block'
        ) {
            setIsContentOpen(prevState => !prevState);
            content.style.display = content.style.display === '' ? 'block' : '';
        }
    };

    const handleWindowResize = () => {
        const navBarCollapse = document.getElementById('navBar-collapse');
        const body = document.getElementsByTagName('body')[0];
        if (window.innerWidth > 800) {
            navBarCollapse.style.display = isMenuOpen ? 'flex' : '';
            body.style.overflowY = isMenuOpen ? 'hidden' : 'auto';
            setIsMenuOpen(false);
        }
    };

    return (
        <nav>
            <div id="navContent">
                <div className="navBar-header">
                    <a href="https://yourtriptoparadise.netlify.app">
                        <img src={logo} alt="logo" className="logo"></img>
                    </a>
                    <div id="navBar-toggle" className={`menu ${isMenuOpen ? 'opened' : ''}`} onClick={toggleButton}>
                        <svg width="100" height="100" viewBox="0 0 100 100">
                        <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" strokeLinecap="round" />
                        <path className="line line2" d="M 20,50 H 80" strokeLinecap="round"/>
                        <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="phoneNum-lang">
                        <p>Call Us at: 1-800-123-456</p>
                    </div>

                    {session ? (
                        <form className="user-btns">
                            <div className="dropDown">
                                <a className="btn-toggle" onClick={toggleContent}><FaUserAlt style={{'margin': '0px 10px -2px 0px'}}/>{userName}{isContentOpen ? (<FaCaretDown style={{'margin': '0px 0px -2px 10px'}}/>) : (<FaCaretLeft style={{'margin': '0px 0px -2px 10px'}}/>)}</a>
                                <div className="dropDown-content" id="content">
                                    <a href={`/account-settings`}><FaGear style={{'margin': '0px 10px -2px 0px'}}/>Account Settings</a>
                                    <a href={`/bookings`}><FaSuitcase style={{'margin': '0px 10px -2px 0px'}}/>Bookings</a>
                                    <a href={`/favourites`}><FaHeart style={{'margin': '0px 10px -2px 0px'}}/>Favourites</a>
                                    <a onClick={handleSignOut}><FaArrowRightFromBracket style={{'margin': '0px 10px -2px 0px'}}/>Sign Out</a>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <form className="user-btns">
                            <a href={`/register`} className="btn-register">Register</a>
                            <a href={`/sign-in`} className="btn-signIn">Sign In</a>
                        </form>
                    )}
                </div>

                <div className="collapse navBar-collapse menu-toggle-button" id="navBar-collapse">
                    <ul className="nav navBar-nav">
                        <li><a href={`/`} className={isActive('/')}>Home</a></li>
                        <li><a href={`/vacations`} className={isActive('/vacations')}>Vacations</a></li>
                        <li><a href={`/flights`} className={isActive('/flights')}>Flights</a></li>
                        <li><a href={`/hotels`} className={isActive('/hotels')}>Hotels</a></li>
                        <li><a href={`/flights&hotels`}  className={isActive('/flights&hotels')}>Flights + Hotels</a></li>
                        <li><a href={`/car-rental`} className={isActive('/carRental')}>Car Rentals</a></li>
                        <li><a href={`/cruises`}  className={isActive('/cruises')}>Cruises</a></li>
                        {session ? (
                            <li id="menuOpt">
                                <a href={`/user-opt`} style={{'marginRight': '24px' }}><FaUserAlt style={{'margin': '0px 10px -2px 0px'}}/>{userName}</a>
                                <a onClick={handleSignOut}><FaArrowRightFromBracket style={{'margin': '0px 10px -2px 0px'}}/>Sign Out</a>
                            </li>
                        ) : (
                            <li id="menuOpt">
                                <a href={`/register`} style={{'marginRight': '24px' }}>Register</a>
                                <a href={`/sign-in`}>Sign In</a>
                            </li>
                            
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
