import React, { useState } from 'react';
import '../../assets/css/signIn&regStyle.css';
import showPwdImg from '../../assets/images/showPass.svg';
import hidePwdImg from '../../assets/images/hidePass.svg';
import UserDataService from "../../assets/js/service.js";

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const onChangeFirstName = e => setFirstName(e.target.value);
    const onChangeLastName = e => setLastName(e.target.value);
    const onChangeEmail = e => setEmail(e.target.value);
    const onChangePassword = e => setPassword(e.target.value);
    const onChangePassword2 = e => setPassword2(e.target.value);
    const onChangeShowPass = () => setShowPass(prevState => !prevState);

    const handleRegister = async (e) => {
        e.preventDefault();

        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            password2: password2
        };

        UserDataService.register(data)
        .then(response => {
            // console.log(response.data);
            setSuccess(true);
            setSuccessMsg(response.data);
            setTimeout(() => { window.location.replace('/signIn'); }, 60000); 
        })
        .catch(error => { 
            // console.log(error.response.data);
            setError(true);
            setErrorMsg(error.response.data);
            setTimeout(() => { window.location.replace('/register'); }, 60000); 
        });

    };

    return (
        <div className="userPage" id="reg">
            <h2>Register</h2>
            <hr/>
            {success ? (
                <div className="alert"> 
                    <strong>{successMsg}</strong> 
                    <br/><br/>
                    <a className="btn" href="/signin">Proceed to Login</a>
                </div>
            ) : (
                <>
                    {error ? (
                        <div className="alert">
                            <strong>{errorMsg}</strong>
                            <br/><br/>
                            <a className="btn" href="/register">Proceed to Register</a>
                        </div>
                    ) : (
                        <div>
                            <div className="userForm">
                                <form onSubmit={handleRegister}>
                                    <input className="formInput" id="firstName" name="firstName" type="text" placeholder="Frist Name" maxLength="10" required value={firstName} onChange={onChangeFirstName}/><br/>
                                    <input className="formInput" id="lastName" name="lastName" type="text" placeholder="Last Name" required value={lastName} onChange={onChangeLastName}/><br/>
                                    <input className="formInput" id="email" name="email" type="email" placeholder="Email Address" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" required value={email} onChange={onChangeEmail}/><br/>
                                    <input className="formInput" id="password" name="password" type={showPass ?  "text" : "password"} placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" 
                                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters" required value={password} onChange={onChangePassword}/><br/>
                                    <img className="reg1 icon" src={showPass ? showPwdImg : hidePwdImg} onClick={onChangeShowPass} />
                                    <input className="formInput" id="password2" name="password2" type={showPass ?  "text" : "password"} placeholder="Confirm Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" 
                                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters" required value={password2} onChange={onChangePassword2}/><br/>
                                    <img className="reg2 icon" src={showPass ? showPwdImg : hidePwdImg} onClick={onChangeShowPass} />
        
                                    <input type="submit" className="btn" value="Register"></input>
                                    <br/><br/>Already Have an Account?<br/>
                                    <a href={`/signIn`} className="btn">Sign In</a>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Register
