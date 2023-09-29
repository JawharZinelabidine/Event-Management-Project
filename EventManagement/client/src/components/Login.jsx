import React, { useState } from "react";
import axios from "axios";


const Login = ({ setTokenAndUser, switchView }) => {


    const [credentials, setCredentials] = useState({})



    const logIn = async (credentials) => {
        try {
            const { data } = await axios.post('http://localhost:3000/api/users-login', credentials)
            console.log(data.data)
            return data

        } catch (error) {
            console.log(error)
            alert('invalid email or password')
        }

    }


    const handleChange = async (e) => {

        const name = e.target.name
        const value = e.target.value

        setCredentials({ ...credentials, [name]: value })



    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        const { data, user } = await logIn(credentials)


        setTokenAndUser(data, user)



    }



    return (


        <div className="full-screen">
            <div className="containerSignIn">
                <div className="login">
                    <h1 className="signIn">Sign In</h1>
                    <form name="formLogin" onSubmit={handleSubmit}>
                        <div className="input">
                            <label for="email">Email:</label>
                            <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                        </div>
                        <div className="input">
                            <label for="password">Password:</label>
                            <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
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