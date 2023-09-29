import React, { useState } from "react";
import axios from "axios";


const Login = ({ switchView }) => {


    const [credentials, setCredentials] = useState({})


    const signUp = async (credentials) => {
        try {
            const { data } = await axios.post('http://localhost:3000/api/users', credentials)
            console.log(data)
            return data

        } catch (error) {
            console.log(error)
            alert('email already exists')
        }

    }


    const handleChange = async (e) => {

        const name = e.target.name
        const value = e.target.value

        setCredentials({ ...credentials, [name]: value })

        console.log(credentials)


    }


    const handleSubmit = async (e) => {

        e.preventDefault()
        await signUp(credentials)


        switchView('eventList')

    }



    return (


        <div className="full-screen">
            <div className="containerSignIn">
                <div className="login">
                    <h1 className="signIn">Sign Up</h1>
                    <form name="formLogin" onSubmit={handleSubmit}>
                        <div className="input">
                            <label for="name">Name:</label>
                            <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
                        </div>
                        <div className="input">
                            <label for="email">Email:</label>
                            <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                        </div>
                        <div className="input">
                            <label for="password">Password:</label>
                            <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                        </div>
                        <div className="input">
                            <input type="submit" value="Sign Up" />
                        </div>
                        <button onClick={() => { switchView('eventList') }}>Already registered? Sign in!</button>
                    </form>
                </div>
            </div>
        </div>


    )


}

export default Login