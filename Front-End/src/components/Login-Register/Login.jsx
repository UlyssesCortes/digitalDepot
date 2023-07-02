import React, { useState, useEffect } from 'react';
import '../../css/login.css'
import Lottie from "lottie-react"
import authorization from "../../assets/LottieAnimations/loadingLogin.json"
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import { wrongUserAlert } from './Alerts';

const Login = ({ setIsLoggedIn, API_URL, setUser, setToken, setHideNav, modalEmail, demoUser, setDemoUser }) => {

    const [email, setEamil] = useState("")
    const [password, setPassword] = useState("")
    const [validInfo, setValidInfo] = useState(true)
    const [showAnimation, setShowAnimation] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        if (modalEmail) {
            setEamil(modalEmail)
        }
        setHideNav(true)

        if (demoUser) {
            setEamil("demouser@gmail.com")
            setPassword("123456789")
        }
    }, []);

    const handleClose = () => {
        setHideNav(false)
        setEamil("")
        setPassword("")
    }

    const handleChangeEmail = (event) => {
        setEamil(event.target.value.toLowerCase())
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setShowAnimation(true);

        const fetchLogin = async () => {
            try {
                const response = await axios.post(`${API_URL}users/login`, {
                    email: email,
                    password: password,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const result = response.data;
                if (result.token) {
                    setIsLoggedIn(true);
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('token', result.token);
                    setToken(result.token);
                    setUser(result.user);
                } else {
                    setValidInfo(false);
                }

                if (result.token) {
                    setTimeout(() => {
                        navigate('/');
                        setHideNav(false);
                    }, 800);
                }
                if (!result.token) {
                    setShowAnimation(false);
                }
            } catch (error) {
                console.error(error);
            }
        };

        await fetchLogin();
        setDemoUser(false);
    };
    return (
        <>
            <section className="loginComponent">
                <section className='leftLogin'>
                    <div className="loginTitle">
                        <h2>Sign in now!</h2>
                        <p className="loginSlogan">
                            Your Gateway to Furniture Excellence
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="formContainer">

                        <div className="container">
                            {!validInfo && wrongUserAlert()}
                        </div>
                        <input type='text' placeholder="Email" value={email} onChange={handleChangeEmail} className="inputLogin">
                        </input>
                        <input type='password' placeholder="Password" value={password} onChange={handleChangePassword} className="inputLogin">
                        </input>
                        <button type="submit" className="loginBtn">Log In &rarr;</button>
                    </form>

                    <Link to='/products' className="link-2" onClick={() => { handleClose() }}></Link>

                    <div className='memberDetail'>
                        <p className="signUpContainer">Not a member?</p>
                        <Link to='/register' className="signUp navLink">Sign Up</Link>
                    </div>
                    <p onClick={() => {
                        setEamil("demouser@gmail.com")
                        setPassword("123456789")
                    }}
                        className=" demoUser">Demo User
                    </p>
                </section>

                <div className='authContainer'>
                    {showAnimation && <Lottie className="authorizationAnimation" animationData={authorization} loop={false} />}
                </div>

                <section className='rightLoginImg'>
                    <img className="loginImg" src={"https://secure.img1-fg.wfcdn.com/im/04285501/resize-h800-w800%5Ecompr-r85/1539/153992096/Jewett+Swivel+Office+Chair.jpg"} alt="product Image" />
                </section>
            </section>
        </>
    )
}

export default Login
