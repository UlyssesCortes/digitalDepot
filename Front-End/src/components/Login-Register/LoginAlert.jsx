import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function LoginAlert({ setLoginAlert, setModalEmail, modalEmail, setDemoUser }) {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/login');
    }
    const handleClose = () => {
        setLoginAlert(false)
    }

    const handleChangeEmail = (event) => {
        setModalEmail(event.target.value.toLowerCase())
    }

    return (
        <section className='loginAlert'>
            <div className='topLoginAlert'>
                <p>Enter your email address to sign in or create and account</p>
            </div>
            <div className='bottomLoginAlert'>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder="Email" value={modalEmail} onChange={handleChangeEmail} className="inputLogin loginAlertInp"></input>
                    <section className='contSectioin'>
                        <button className='continueLogBtn' type='submit'>Continue</button>
                        <button className='demo' onClick={() => { setDemoUser(true) }}>Demo User</button>
                    </section>
                </form>
            </div>
            <div className="sliderClose alertClose" onClick={handleClose}></div>
        </section>
    )
}
