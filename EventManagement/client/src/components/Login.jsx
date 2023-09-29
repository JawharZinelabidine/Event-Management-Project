import React, { useState } from "react";
import axios from "axios";


const Login = ({ setToken, switchView }) => {


    const [username, setUsername] = useState()
    const [password, setPassword] = useState()


    const logIn = async (credentials) => {
        try {
            const { data } = await axios.post('http://localhost:3000/api/users', credentials)
            console.log(data)
            return data

        } catch (error) {
            console.log(error)
        }

    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        const name = username
        const token = await logIn({
            name, password
        })

        setToken(token)

    }



    return (


        <div className="full-screen">
            <div className="containerSignIn">
                <div className="login">
                    <h1 className="signIn">Sign In</h1>
                    <form name="formLogin" onSubmit={handleSubmit}>
                        <div className="input">
                            <label for="username">Email:</label>
                            <input type="text" name="username" placeholder="Username" required onChange={(e) => { setUsername(e.target.value) }} />
                        </div>
                        <div className="input">
                            <label for="password">Password:</label>
                            <input type="password" name="password" placeholder="Password" required onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className="input">
                            <input type="submit" value="Login" />
                        </div>
                        <button onClick={() => { switchView('signup') }}>Don't have an account? Sign Up here</button>
                    </form>
                </div>
            </div>
        </div>


    )


}

export default Login