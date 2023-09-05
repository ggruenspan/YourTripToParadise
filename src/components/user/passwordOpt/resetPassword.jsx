import React, { useState, } from 'react';
import { useParams } from 'react-router-dom';
import '../../../assets/css/account-management.css';
import showPwdImg from '../../../assets/images/showPass.svg';
import hidePwdImg from '../../../assets/images/hidePass.svg';
import UserDataService from '../../../assets/js/service.js';

function resetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const onChangePassword = e => setPassword(e.target.value);
    const onChangePassword2 = e => setPassword2(e.target.value);
    const onChangeShowPass = () => setShowPass(prevState => !prevState);


    const handlePasswordReset = async (e) => {
        e.preventDefault();

        const data = {
            password: password,
            password2: password2
        };

        UserDataService.resetPassword(token, data)
        .then(response => {
            // console.log(response.data);
            setSuccess(true);
            setSuccessMsg(response.data);
            setTimeout(() => { window.location.replace('/sign-in'); }, 60000); 
        })
        .catch(error => { 
            // console.log(error.response.data);
            setError(true);
            setErrorMsg(error.response.data);
            setTimeout(() => { window.location.replace(`/reset-password/${token}`); }, 60000); 
        });
    }

    return (
        <div className="userPage">
            <h2>Forgot Password</h2>
            <hr/>
            {success ? (
                <div className="alert"> 
                    <strong>{successMsg}</strong> 
                    <br/><br/>
                    <a className="btn" href={'/sign-in'}>Proceed to Login</a>
                </div>
            ) : (
                <>
                    {error ? (
                        <div className="alert">
                            <strong>{errorMsg}</strong>
                            <br/><br/>
                            <a className="btn" href={`/reset-password/${token}`}>Proceed Rest Password</a>
                        </div>
                    ) : (
                        <div>
                            <div className="description">Please enter your new password below.</div>
                            <div className="userForm">
                                <form onSubmit={handlePasswordReset}>
                                    <div className="passwordInputContainer">
                                        <input className="formInput" id="password" name="password" type={showPass ?  "text" : "password"} placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" 
                                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters" required value={password} onChange={onChangePassword}/><br/>
                                        <img className="reg1 icon" src={showPass ? showPwdImg : hidePwdImg} onClick={onChangeShowPass} />
                                        <input className="formInput" id="password2" name="password2" type={showPass ?  "text" : "password"} placeholder="Confirm Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" 
                                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters" required value={password2} onChange={onChangePassword2}/><br/>
                                        <img className="reg2 icon" src={showPass ? showPwdImg : hidePwdImg} onClick={onChangeShowPass} />
                                    </div>

                                    <input type="submit" className="btn" value="Reset Password"></input>
                                    <br/><br/>Already Have an Account?<br/>
                                    <a href={`/sign-in`} className="btn" style={{'marginTop': '10px'}}>Sign In</a>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default resetPassword
