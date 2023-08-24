import React from 'react';
import '../assets/css/navBarStyle.css';
import logo from '../assets/images/logo.png';
import UserDataService from "../assets/js/service.js";
import { FaUserAlt, FaCaretDown, FaCaretLeft, FaSuitcase, FaHeart } from 'react-icons/fa';
import { FaGear, FaArrowRightFromBracket } from "react-icons/fa6";

class navBar extends React.Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);

        this.state = {
            currentPath: window.location.pathname,
            session: null,
            userName: '',
            isMenuOpen: false,
            isContentOpen: false
        };
    }

    componentDidMount() {
        this.userData();
    }

    userData = async function () {
        UserDataService.getUserData()
        .then(response => {
            console.log(response.data);
            this.setState({
                session: true,
                userName: response.data.userName,
            });
        })
    }

    isActive = (path) => {
        return this.state.currentPath === path ? 'active' : '';
    };

    toggleButton = () => {
        this.setState(prevState => ({
            isMenuOpen: !prevState.isMenuOpen,
        }), () => {
            const navBarCollapse = document.getElementById('navBar-collapse');
            if (navBarCollapse) {
                if (this.state.isMenuOpen) {
                    navBarCollapse.style.display = 'flex';
                } else {
                    navBarCollapse.style.display = '';
                }
            }
        });
    }

    toggleContent = () => {
        this.setState(prevState => ({
            isContentOpen: !prevState.isContentOpen,
        }), () => {
            const content = document.getElementById('content');
            if (content.style.display === '') {
                content.style.display = 'block';
            } else {
                content.style.display = '';
            }
        });

    }
    
    render() {
        const { userName, isMenuOpen, isContentOpen } = this.state;
        return (
            <nav>
                <div id="navContent">
                    <div className="navBar-header">
                        <a href="https://yourtriptoparadise.netlify.app">
                            <img src={logo} alt="logo" className="logo"></img>
                        </a>
                        <div id="navBar-toggle" className={`menu ${isMenuOpen ? 'opened' : ''}`} onClick={this.toggleButton}>
                            <svg width="100" height="100" viewBox="0 0 100 100">
                            <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" strokeLinecap="round" />
                            <path className="line line2" d="M 20,50 H 80" strokeLinecap="round"/>
                            <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="phoneNum-lang">
                            <p>Call Us at: 1-800-123-456</p>
                        </div>

                        {this.state.session ? (
                            <form className="user-btns">
                                <div className="dropDown">
                                    <a className="btn-toggle" onClick={this.toggleContent}><FaUserAlt style={{'margin': '0px 10px -2px 0px'}}/>{userName}{isContentOpen ? (<FaCaretDown style={{'margin': '0px 0px -2px 10px'}}/>) : (<FaCaretLeft style={{'margin': '0px 0px -2px 10px'}}/>)}</a>
                                    <div className="dropDown-content" id="content">
                                        <a href={`/accountSettings`}><FaGear style={{'margin': '0px 10px -2px 0px'}}/>Account Settings</a>
                                        <a href={`/bookings`}><FaSuitcase style={{'margin': '0px 10px -2px 0px'}}/>Bookings</a>
                                        <a href={`/favourites`}><FaHeart style={{'margin': '0px 10px -2px 0px'}}/>Favourites</a>
                                        <a onClick={this.signOut}><FaArrowRightFromBracket style={{'margin': '0px 10px -2px 0px'}}/>Log Out</a>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <form className="user-btns">
                                <a href={`/register`} className="btn-register">Register</a>
                                <a href={`/signIn`} className="btn-signIn">Sign In</a>
                            </form>
                        )}
                    </div>

                    <div className="collapse navBar-collapse" id="navBar-collapse">
                        <ul className="nav navBar-nav">
                            <li><a href={`/`} className={this.isActive('/')}>Home</a></li>
                            <li><a href={`/vacations`} className={this.isActive('/vacations')}>Vacations</a></li>
                            <li><a href={`/flights`} className={this.isActive('/flights')}>Flights</a></li>
                            <li><a href={`/hotels`} className={this.isActive('/hotels')}>Hotels</a></li>
                            <li><a href={`/flights&hotels`}  className={this.isActive('/flights&hotels')}>Flights + Hotels</a></li>
                            <li><a href={`/carRental`} className={this.isActive('/carRental')}>Car Rentals</a></li>
                            <li><a href={`/cruises`}  className={this.isActive('/cruises')}>Cruises</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default navBar
