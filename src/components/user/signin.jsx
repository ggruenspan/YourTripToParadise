import React from 'react';
import '../../assets/css/signIn&regStyle.css';
import showPwdImg from '../../assets/images/showPass.svg';
import hidePwdImg from '../../assets/images/hidePass.svg';
import UserDataService from "../../assets/js/service.js";

class signIn extends React.Component {
    
    render() {
        return (
            <>
                <div className="userPage" id="signIn">
                <h2>Sign In</h2>
                <hr/>
                    <div>
                        <div className="userForm">
                            <form>
                                <input/><br/>
                                <input/><br/>

                                <input type="submit" className="btn" value="Sign In"></input>
                                <br/><br/>Need an Account?<br/>
                                <a href={`/register`} className="btn">Register</a>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default signIn