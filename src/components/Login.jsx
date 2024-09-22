import React, { useState } from 'react'
import {auth} from "../firebase"
// import { useHistory } from "react-router-dom";
// // import { ToastProvider, useToasts } from "react-toast-notifications";
import "./Login.css"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    // const { addToast } = useToasts();

    const onSubmitHandler = () => {

        if (email == "" || password == "") {
            // addToast("Fields Incomplete", {
            //     appearance: "error",
            //     autoDismiss: true,
            // });
        }
        else {
            signIn(email, password)
            setPassword("");
            setEmail("");
        }
    }

    const signIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in!!!")
            // addToast("Logged In!", {
            //     appearance: "success",
            //     autoDismiss: true,
            // });
            navigate("/pg") 
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    return (
        <div className="login">

            <div className="input_add_pg">
            <h2 className="form_heading">ORN Admin Login</h2>
                <input
                    type="text"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="loginBtn" onClick={onSubmitHandler}>
                    LOGIN
                </button>
            </div>
        </div>
    )
}

export default Login
