import React, { useState, } from 'react';
import '../../assets/css/signIn&regStyle.css';
import showPwdImg from '../../assets/images/showPass.svg';
import hidePwdImg from '../../assets/images/hidePass.svg';
import UserDataService from '../../assets/js/service.js';

function signIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const onChangeEmail = e => setEmail(e.target.value);
    const onChangePassword = e => setPassword(e.target.value);
    const onChangeShowPass = () => setShowPass(prevState => !prevState);

    const handleSignIn = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        };

        UserDataService.signIn(data)
        .then(response => {
            // console.log(response.data);
            localStorage.setItem('jwtToken', response.data.token);
            setTimeout(() => { window.location.replace('/'); }, 0);
        })
        .catch(error => {
            // console.log(error.response.data);
            setError(true);
            setErrorMsg(error.response.data);
            setTimeout(() => { window.location.replace('/register'); }, 60000); 
        })

    }

    return (
        <div className="userPage" id="signIn">
            <h2>Sign In</h2>
            <hr/>
            {error ? (
                <div className="alert">
                    <strong>{errorMsg}</strong>
                    <br/><br/>
                    <a className="btn" href="/signIn">Proceed to Login</a>
                </div>
            ) : (
                <div>
                    <div className="userForm">
                        <form onSubmit={handleSignIn}>
                            <input className="formInput" id="email" name="email" type="email" placeholder="Email Address" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" required value={email} onChange={onChangeEmail}/><br/>
                            <div className="passwordInputContainer">
                                <input className="formInput" id="password" name="password" type={showPass ?  "text" : "password"} placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" 
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters" required value={password} onChange={onChangePassword}/><br/>
                                <img className="signIn icon" src={showPass ? showPwdImg : hidePwdImg} onClick={onChangeShowPass} />
                            </div>

                            <input type="submit" className="btn" value="Sign In"></input>
                            <br/><br/>Need an Account?<br/>
                            <a href={`/register`} className="btn">Register</a>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default signIn