/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState } from "react";
import { Link} from "react-router-dom";
import { SetToken } from "./storingToken";
import "../App.css"
const otpForVerification3=Math.floor(10000000 + Math.random() * 90000000);

/* eslint-disable no-unused-vars */
export function SignUp({ onSignup }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [verificationStep, setVerificationStep] = useState(false);
    const [loading,setLoading]=useState(false)
    const [verified,setVerified]=useState(false)
    const otpForVerification2=otpForVerification3
    const handleSignUp = async () => {
        if (name === "" || email === "" || password === "") {
            alert("Please fill in all required fields");
            return;
        }
        setLoading(true)
        try {
            const response = await fetch("https://deploy-mern-backend1-1.onrender.com/signUp", {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await response.json();
            if (json.msg === "User created Successfully") {
                alert("User created Successfully. Check your email for verification.");
                setVerificationStep(true);
                SetToken(json.token)
            //sendOTP(email,otpForVerification);
                const response2=await fetch("https://deploy-mern-backend1-1.onrender.com/sendOtp",{
                    method:'POST',
                    body: JSON.stringify({
                        email: email,
                        otp: otpForVerification2
                    }),
                    headers: {
                        "Content-type": "application/json"
                    }
                })
            } else {
                alert(json.msg);
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }finally{
            setLoading(false)
        }
    };
    const handleVerify = async () => {
        
        try {
            const response = await fetch("https://deploy-mern-backend1-1.onrender.com/verifyEmail", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    otp: otp,
                    generatedOtp:otpForVerification2
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await response.json();
            if (json.msg === "Email verified successfully") {
                alert("Email verified successfully. You can now access the items page.");
                onSignup(name);
                setVerified(true)
            } else {
                alert(json.msg);
            }
        } catch (error) {
            console.error("Error verifying email:", error);
        }
    };
    return (
        <div>
            {verificationStep ? (
                <div>
                    <input
                        type="text"
                        value={otp}
                        placeholder="Enter OTP"
                        onChange={(e) => setOtp(e.target.value)}
                        style={{
                            padding:10,
                            margin:10
                        }}
                    /><br/>
                    <div>
                        {verified?(
                        <div
                        style={{display:'flex',flexDirection:'row',alignItems:'center'}}
                        >
                        <button style={{margin:10,padding:10}}>User Verified</button>
                        <Link style={{margin:10,padding:10}} to ='/items'>Go to shopping list page</Link>
                        </div>
                        ):(<button style={{margin:10,padding:10}} onClick={handleVerify}>Verify</button>)}
                    </div>
                    
                </div>
            ) : (
                <div>
                    {loading? (<div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>Signing Up....</p>
                </div>):(
                        <div>
                            <input
                            type="text"
                            value={name}
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                        style={{
                            padding:10,
                            margin:10
                        }} 
                    /><br/>
                    <input
                        type="text"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            padding:10,
                            margin:10
                        }}
                    /><br/>
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            padding:10,
                            margin:10
                        }}
                    /><br/>
                    <button style={{margin:10,padding:10}} onClick={handleSignUp}>Sign Up</button>
                    <Link to="/login">Login</Link>
                </div>

                    )}
                </div>                    
            )}
        </div>
    );
}