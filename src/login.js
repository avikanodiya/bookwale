import React, { useState } from 'react';
import './Login.css'
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login(props) {

    const history = useHistory();
    const [username,setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e =>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password).then(auth=>{
            history.push('/')}).catch(error => alert(error.messasge))
    }

    const register = e => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
                // it successfully created a new user with email and password
                if (auth) {
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))
            console.log(username)
    }
     

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src=''
                    alt="bookshop logo"
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>Username</h5>
                    <input type='text' value={username} onChange={e => setUsername(e.target.value)} />

                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button onClick={signIn} type='submit' className='login__signInButton'>Sign In</button>
                </form>


                
                <button onClick={register} className='login__registerButton'>Create your Account</button>
               
            </div>
        </div>
    )
}

export default Login
