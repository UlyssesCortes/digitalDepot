import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from "lottie-react"
import authorization from "../../assets/LottieAnimations/loadingLogin.json"
import { usernameTakenAlert, passwordTooWeekAlert, invalidEmailAlert } from './Alerts';

const Register = ({ API_URL, setHideNav, setDemoUser }) => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [emailReg, setEmailReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [userNameTaken, setUserNameTaken] = useState(false)
    const [weakPass, setWeakPass] = useState(false)
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [showAnimation, setShowAnimation] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setHideNav(true)
    }, []);

    const handleChangeFirstName = (event) => {
        setFirstName(event.target.value)
    }
    const handleChangeLastName = (event) => {
        setLastName(event.target.value)
    }
    const handleChangeEmailReg = (event) => {
        setEmailReg(event.target.value.toLowerCase())
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
            const response = await axios.post(`${API_URL}users/register`, {
                firstName: firstName,
                lastName: lastName,
                email: emailReg,
                password: passwordReg,
                isAdmin: "false",
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.data;

            if (result.message === "PasswordTooShortError") {
                setWeakPass(true);
            } else if (result.message === 'UserTakenError' && emailReg.length > 0) {
                setUserNameTaken(true);
            } else if (result.token) {
                setWeakPass(false)
                setUserNameTaken(false)
                setShowAnimation(true)
            }

            if (result.token) {
                setTimeout(() => {
                    navigate('/login');
                    setHideNav(false)
                }, 1500);
            }
            if (!result.token) {
                setShowAnimation(false)
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
                    </form>
                    <Link to='/products' className="link-2" onClick={() => { setHideNav(false) }}></Link>

                    <div className='memberDetail'>
                        <p className="signUpContainer">Have an account?</p>

                        <Link to='/login'
                            className="signUp">Log In
                        </Link>
                    </div>
                    <Link to='/login'
                        onClick={() => { setDemoUser(true) }}
                        className=" demoUser">Demo User
                    </Link>
                </section>

                <div className='authContainer'>
                    {showAnimation && <Lottie className="authorizationAnimation2" animationData={authorization} loop={false} />}
                </div>

                <section className='rightLoginImg'>
                    <img className="loginImg" src={"https://secure.img1-fg.wfcdn.com/im/10246168/resize-h800-w800%5Ecompr-r85/1203/120349349/Jewett+Swivel+Office+Chair.jpg"} alt="product Image" />
                </section>
            </section>
        </>
    )
}

export default Register
