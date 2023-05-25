import React, { useState } from 'react';
import '../../css/login.css'

import { Link } from 'react-router-dom';
import { loggedInAlert, wrongUserAlert } from './Alerts';

const Login = ({ isLoggedIn, setIsLoggedIn, API_URL, setUser, setToken }) => {

    const [email, setEamil] = useState("")
    const [password, setPassword] = useState("")
    const [validInfo, setValidInfo] = useState(true)

    const handleChangeEmail = (event) => {
        setEamil(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const fetchLogin = async () => {
            await fetch(`${API_URL}users/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: `${email}`,
                    password: `${password}`

                })
            }).then(response => response.json())
                .then(result => {
                    if (result.token) {
                        setIsLoggedIn(true)
                        localStorage.setItem('isLoggedIn', true)
                        localStorage.setItem('token', result.token);
                        setToken(result.token)
                        setUser(result.user);
                    }
                    if (result.name === 'IncorrectCredentialsError') {
                        setValidInfo(false)
                    }
                })
                .catch(console.error);
        }
        fetchLogin()
    }

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
                        {isLoggedIn ?
                            <div className='container'>
                                {isLoggedIn && loggedInAlert()}
                            </div>
                            : <div className="container">
                                {!validInfo && wrongUserAlert()}
                            </div>}
                        <input type='text' placeholder="Email" value={email} onChange={handleChangeEmail} className="inputLogin">
                        </input>
                        <input type='password' placeholder="Password" value={password} onChange={handleChangePassword} className="inputLogin">
                        </input>
                        <button type="submit" className="loginBtn">Log In &rarr;</button>
                    </form>

                    <Link to='/products' className="link-2 navLink"></Link>

                    <div className='memberDetail'>
                        <p className="signUpContainer">Not a member?</p>

                        <Link to='/register' className="signUp navLink">Sign Up
                        </Link>

                    </div>
                </section>
                <section className='rightLoginImg'>
                    <img className="loginImg" src={"https://secure.img1-fg.wfcdn.com/im/04285501/resize-h800-w800%5Ecompr-r85/1539/153992096/Jewett+Swivel+Office+Chair.jpg"} alt="product Image" />
                </section>
            </section>
        </>
    )
}

export default Login
