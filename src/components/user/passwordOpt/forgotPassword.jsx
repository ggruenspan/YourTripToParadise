import React, { useState, } from 'react';
import '../../../assets/css/account-management.css';
import UserDataService from '../../../assets/js/service.js';

function forgotPassword() {
    const [email, setEmail] = useState('');
    const [msgState, setMsgState] = useState(false);
    const [msg, setMsg] = useState('');

    const onChangeEmail = e => setEmail(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
        };

        try {
            UserDataService.forgotPassword(data)
            setMsgState(true);
            setMsg('If the email entered is valid, a password reset link will be sent to your inbox.');
            setTimeout(() => { window.location.replace('/sign-in'); }, 60000); 
        } catch (error) {
            console.error('Error sending rest link', error);
            setTimeout(() => { window.location.replace('/forgot-password'); }, 0); 
        }
    }

    return (
        <div className="userPage">
            <h2>Forgot Password</h2>
            <hr/>
            {msgState ? (
                <div className="alert">
                    <strong>{msg}</strong>
                    <br/><br/>
                    <a className="btn" href={`/sign-in`}>Proceed to Login</a>
                </div>
            ) : (
                <div>
                    <div className="description">Provide your account's email address and a reset password email will be sent to your inbox.</div>
                    <div className="userForm">
                        <form onSubmit={handleSubmit}>
                            <input className="formInput" id="email" name="email" type="email" placeholder="Email Address" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" required value={email} onChange={onChangeEmail}/><br/>

                            <input type="submit" className="btn" value="Request Rest"></input>
                            <br/><br/>Already Have an Account?<br/>
                            <a href={`/sign-in`} className="btn" style={{'marginTop': '10px'}}>Sign In</a>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default forgotPassword
