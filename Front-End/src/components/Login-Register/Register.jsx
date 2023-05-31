import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from "lottie-react"
import authorization from "../../assets/registered3.json"
import { usernameTakenAlert, passwordTooWeekAlert, invalidEmailAlert } from './Alerts';

const Register = ({ API_URL, setHideNav }) => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [emailReg, setEmailReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [userNameTaken, setUserNameTaken] = useState(false)
    const [weakPass, setWeakPass] = useState(false)
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [registered, setRegistered] = useState(false)

    const handleChangeFirstName = (event) => {
        setFirstName(event.target.value)
    }
    const handleChangeLastName = (event) => {
        setLastName(event.target.value)
    }
    const handleChangeEmailReg = (event) => {
        setEmailReg(event.target.value)
        if (event.target.value.includes('@') || emailReg.includes('.com')) {
            setInvalidEmail(false)
        }
    }
    const handleChangePasswordRegister = (event) => {
        setPasswordReg(event.target.value)
        setUserNameTaken(false)
        if (!emailReg.includes('@') || !emailReg.includes('.com')) {
            setInvalidEmail(true)
        } else if (emailReg.includes('@') || emailReg.includes('.com')) {
            setInvalidEmail(false)
        }
    }

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        if (passwordReg.length < 8 && passwordReg.length !== 0) {
            setWeakPass(true);
            return;
        }
        try {
            const response = await fetch(`${API_URL}users/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: emailReg,
                    password: passwordReg,
                    isAdmin: "false"
                })
            });

            const result = await response.json();
            console.log(result)

            if (result.message === "PasswordTooShortError") {
                setWeakPass(true);
            } else if (result.message === 'UserTakenError' && emailReg.length > 0) {
                setUserNameTaken(true);
            } else if (result.token) {
                setRegistered(true);
                setWeakPass(false)
                setUserNameTaken(false)
            }

            if (result.token) {
                setTimeout(() => {
                    window.location.href = '/login';
                }, 3200);
            }

        } catch (error) {
            console.error("An error occurred during registration:", error);
        }
    };

    return (
        <>
            <section className="loginComponent">
                <section className='leftLogin'>
                    <div className="loginTitle">
                        <h2>Create an account</h2>
                        <p className="loginSlogan">
                            Your Gateway to Furniture Excellence.
                        </p>
                    </div>

                    <form onSubmit={handleRegisterSubmit} className="formContainer">
                        {userNameTaken && <div className="container">{usernameTakenAlert()}</div>}
                        {weakPass && <div className="container">{passwordTooWeekAlert()}</div>}
                        {invalidEmail && <div className="container">{invalidEmailAlert()}</div>}
                        <div className='names'>
                            <input type='text' placeholder="First Name" value={firstName} onChange={handleChangeFirstName} className="inputLogin namesInp"></input>
                            <input type='text' placeholder="Last Name" value={lastName} onChange={handleChangeLastName} className="inputLogin namesInp"></input>
                        </div>

                        <input type='text' placeholder="Email" value={emailReg} onChange={handleChangeEmailReg} className="inputLogin"></input>
                        <input type='password' placeholder="Password" value={passwordReg} onChange={handleChangePasswordRegister} className="inputLogin"></input>
                        <button type="submit" className="loginBtn">Register &rarr;</button>
                        <button className='googleLog'>
                            <div className='googleIcon'></div>
                            Sign up with Google
                        </button>
                    </form>
                    <Link to='/products' className="link-2" onClick={() => { setHideNav(false) }}></Link>

                    <div className='memberDetail'>
                        <p className="signUpContainer">Have an account?</p>

                        <Link to='/login'
                            className="signUp navLink">Log In
                        </Link>
                    </div>
                </section>

                <div className='authContainer'>
                    {registered && <Lottie className="authorizationAnimation2" animationData={authorization} loop={false} />}
                </div>

                <section className='rightLoginImg'>
                    <img className="loginImg" src={"https://secure.img1-fg.wfcdn.com/im/10246168/resize-h800-w800%5Ecompr-r85/1203/120349349/Jewett+Swivel+Office+Chair.jpg"} alt="product Image" />
                </section>
            </section>
        </>
    )
}

export default Register
