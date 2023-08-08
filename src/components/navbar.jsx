import '../assets/css/navBarStyle.css';
import logo from '../assets/images/logo.png';

function Navbar() {
    return (
        <>
            <nav>
                <div id="navcontent">
                    <div className="navbar-header">
                        <a href="https://yourtriptoparadise.netlify.app">
                            <img src={logo} alt="logo" className="logo"></img>
                        </a>
                        <div id="navbar-toggle" className="menu" onClick={"N/A"}>
                            <svg width="100" height="100" viewBox="0 0 100 100">
                            <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" strokeLinecap="round" />
                            <path className="line line2" d="M 20,50 H 80" strokeLinecap="round"/>
                            <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" strokeLinecap="round" />
                            </svg>
                        </div>
                        {/* <div className="searchbox">
                            <input className="searchtext" type="search" id="serach" onKeyUp="searchFunction()" placeholder="Type to search"></input>
                            <a className="searchbtn">
                                <AiOutlineSearch style={{fontSize: '26px'}}/>
                            </a>
                        </div> */}
                        <div className="phoneNum-lang">
                            <p>Call Us at: 1-800-123-456</p>
                        </div>
                        {/* {{#if session.user}} */}
                            {/* <form className="user-btns">
                                <div className="dropdown">
                                    <a className="btn-toggle" onclick="toggleContent()"><i className="fa-solid fa-user"></i>&nbsp;&nbsp;{{session.user.userName}}&nbsp;&nbsp;<i className="fa-solid fa-sort-down"></i></a>
                                    <div className="dropdown-content" id="content">
                                        <a href="/accountsettings"><i className="fa-solid fa-gear"></i>&nbsp;&nbsp;Account Settings</a>
                                        <a href="/bookings"><i className="fa-solid fa-suitcase"></i>&nbsp;&nbsp;Bookings</a>
                                        <a href="/favourites"><i className="fa-solid fa-heart"></i>&nbsp;&nbsp;Favourites</a>
                                        <a href="/logout"><i className="fa-solid fa-arrow-right-from-bracket"></i>&nbsp;&nbsp;Log Out</a>
                                    </div>
                                </div>
                            </form> */}
                        {/* {{else}} */}
                            <form className="user-btns">
                                <a href={`/register`} className="btn-register">Register</a>
                                <a href={`/signin`} className="btn-signin">Sign In</a>
                            </form>
                        {/* {{/if}} */}
                    </div>

                    <div className="collapse navbar-collapse" id="navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><a href={`/`}>Home</a></li>
                            <li><a href={`/vacations`}>Vacations</a></li>
                            <li><a href={`/flights`}>Flights</a></li>
                            <li><a href={`/hotels`}>Hotels</a></li>
                            <li><a href={`/flights&hotels`}>Flights + Hotels</a></li>
                            <li><a href={`/car-rental`}>Car Rentals</a></li>
                            <li><a href={`/cruises`}>Cruises</a></li>

                            {/* {{#if session.user}}
                                <li id="opt" style="display: none;"><a href="/useropt">&nbsp;<i class="fa-solid fa-user"></i>&nbsp;{{session.user.userName}}</a></li>
                                <li id="out" style="display: none;"><a href="/logout">&nbsp;<i class="fa-solid fa-arrow-right-from-bracket"></i>&nbsp;Log Out</a></li>
                            {{else}}
                                <li id="regsign"><a href="/register">Register</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/signin">Sign In</a></li>
                            {{/if}}  */}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
