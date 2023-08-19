import React from 'react';
import '../../assets/css/signIn&regStyle.css';
import showPwdImg from '../../assets/images/showPass.svg';
import hidePwdImg from '../../assets/images/hidePass.svg';
import UserDataService from "../../assets/js/service.js";

class signIn extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeShowPass = this.onChangeShowPass.bind(this);
        this.checkUser = this.checkUser.bind(this);

        this.state = {
            email: "",
            password: "",
            showPass: false,

            success: false,
            successMsg: "",
            error: false,
            errorMsg: "",
        };
    }

    onChangeEmail(e) { this.setState({ email: e.target.value }); }
    onChangePassword(e) {  this.setState({ password: e.target.value }); }
    onChangeShowPass() { this.setState(prevState => ({ showPass: !prevState.showPass })); }

    checkUser(e) {
        e.preventDefault()

        var data = {
            email: this.state.email,
            password: this.state.password,
        };

        UserDataService.signIn(data)
        .then(() => {})
        .catch(() =>{});
    }

    render() {
        return (
            <div className="userPage" id="signIn">
                <h2>Sign In</h2>
                <hr/>
                {this.state.error ? (
                    <div className="alert">
                        <strong>{this.state.errorMsg}</strong>
                        <br/><br/>
                        <a className="btn" href="/signIn">Proceed to Login</a>
                    </div>
                ) : (
                    <div>
                        <div className="userForm">
                            <form onSubmit={this.checkUser}>
                                <input className="formInput" id="email" name="email" type="email" placeholder="Email Address" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" required value={this.state.email} onChange={this.onChangeEmail}/><br/>
                                <input className="formInput" id="password" name="password" type={this.state.showPass ?  "text" : "password"} placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" 
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters" required value={this.state.password} onChange={this.onChangePassword}/><br/>
                                <img className="signIn icon" src={this.state.showPass ? showPwdImg : hidePwdImg} onClick={this.onChangeShowPass} />
    
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
}

export default signIn