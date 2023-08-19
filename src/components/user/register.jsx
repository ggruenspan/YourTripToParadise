import React from 'react';
import '../../assets/css/signIn&regStyle.css';
import showPwdImg from '../../assets/images/showPass.svg';
import hidePwdImg from '../../assets/images/hidePass.svg';
import UserDataService from "../../assets/js/service.js";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePassword2 = this.onChangePassword2.bind(this);
        this.onChangeShowPass = this.onChangeShowPass.bind(this);
        this.saveUser = this.saveUser.bind(this);
    
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            password2: "",
            showPass: false,

            success: false,
            successMsg: "",
            error: false,
            errorMsg: "",
        };
    }
    
    onChangeFirstName(e) { this.setState({ firstName: e.target.value }); }
    onChangeLastName(e) { this.setState({ lastName: e.target.value }); }
    onChangeEmail(e) { this.setState({ email: e.target.value }); }
    onChangePassword(e) {  this.setState({ password: e.target.value }); }
    onChangePassword2(e) { this.setState({ password2: e.target.value }); }
    onChangeShowPass() { this.setState(prevState => ({ showPass: !prevState.showPass })); }

    saveUser(e) {
        e.preventDefault()

        var data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
    
        UserDataService.register(data)
        .then(e => {
            // console.log(e.data.successMessage);
            this.setState({ success: true, successMsg: e.data.successMessage}); 
            setTimeout(() => { window.location.replace('/signIn'); }, 60000); 
        })
        .catch(e => { 
            // console.log(e.response.data.errorMessage);
            this.setState({ error: true, errorMsg: e.response.data.errorMessage});
            setTimeout(() => { window.location.replace('/register'); }, 60000); 
        });
    }
    
    render() {
        return (
            <div className="userPage" id="reg">
                <h2>Register</h2>
                <hr/>
                {this.state.success ? (
                    <div className="alert"> 
                        <strong>{this.state.successMsg}</strong> 
                        <br/><br/>
                        <a className="btn" href="/signin">Proceed to Login</a>
                    </div>
                ) : (
                    <>
                        {this.state.error ? (
                            <div className="alert">
                                <strong>{this.state.errorMsg}</strong>
                                <br/><br/>
                                <a className="btn" href="/register">Proceed to Register</a>
                            </div>
                        ) : (
                            <div>
                                <div className="userForm">
                                    <form onSubmit={this.saveUser}>
                                        <input className="formInput" id="firstName" name="firstName" type="text" placeholder="Frist Name" maxLength="10" required value={this.state.firstName} onChange={this.onChangeFirstName}/><br/>
                                        <input className="formInput" id="lastName" name="lastName" type="text" placeholder="Last Name" required value={this.state.lastName} onChange={this.onChangeLastName}/><br/>
                                        <input className="formInput" id="email" name="email" type="email" placeholder="Email Address" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" required value={this.state.email} onChange={this.onChangeEmail}/><br/>
                                        <input className="formInput" id="password" name="password" type={this.state.showPass ?  "text" : "password"} placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" 
                                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters" required value={this.state.password} onChange={this.onChangePassword}/><br/>
                                        <img className="reg1 icon" src={this.state.showPass ? showPwdImg : hidePwdImg} onClick={this.onChangeShowPass} />
                                        <input className="formInput" id="password2" name="password2" type={this.state.showPass ?  "text" : "password"} placeholder="Confirm Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" 
                                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters" required value={this.state.password2} onChange={this.onChangePassword2}/><br/>
                                        <img className="reg2 icon" src={this.state.showPass ? showPwdImg : hidePwdImg} onClick={this.onChangeShowPass} />
            
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
}

export default Register
