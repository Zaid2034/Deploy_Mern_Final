/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { ClearLoggedInUsername } from "./loggedIn";
import { SetToken ,clearToken} from "./storingToken";
import "../App.css"

export function Login(){
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const[email,setEmail]=useState("");
    const [redirectToItems, setRedirectToItems] = useState(false);
    const [loading,setLoading]=useState(false)
    const [verified,setVerified]=useState(false)
    const handleSignIn=async ()=>{
        ClearLoggedInUsername();
                if(name=="" || password==""){
                    alert("Please enter the required value")
                }
                else{
                    setLoading(true)
                    try{
                        const response = await fetch('https://deploy-mern-backend1-1.onrender.com/signIn',{
                            method:'POST',
                            body:JSON.stringify({
                                name:name,
                                email:email,
                                password:password
                            }),
                            headers:{
                                "Content-type":"application/json"
                            }
                        })
                        .then(async function(res){
                            const json=await res.json();
                            if(json.msg!=null){
                                alert("Incorrect Username or Password")
                            }
                            else{
                                SetToken(json.token)
                                //alert("User Login")
                                alert("User Logged In successfully")
                                setVerified(true)
                                console.log(`Verification is ${verified}`)
                                setRedirectToItems(true);
                            }  
                        })

                    }catch(error){
                        console.error("Error in login",error)
                    }finally{
                        setLoading(false)
                    }
                    
                }
                /*const json = await response.json(); // Await the JSON parsing
                console.log(`token is ${json}`);
                alert("User added");*/
    }
    return (
        <div>
            {loading?(
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>Signing In....</p>
                </div>
            ):(
                <div>
                    {verified?(<div>
                           <p>User Logged in successfully</p>
                           <Link to='/items'>Go to shopping item page</Link>
                    </div>):(
                        <div>
                    <input style={{
                        padding:10,
                        margin:10
                    }} type="text" value={name} placeholder="name" onChange={(e)=>{
                        setName(e.target.value);
                    }}></input><br/>
                    <input  style={{
                        padding:10,
                        margin:10
                    }}
                    type="text" placeholder="password" onChange={(e)=>{
                        setPassword(e.target.value);
                    }}></input><br/>
                        <div style={{
                            display:'flex',
                            flexDirection:'row',
                            alignItems:'center'
                        }}>
                        <button style={{
                            padding:10,
                            margin:10
                        }} onClick={handleSignIn
                            }>Login</button>
                        <Link style={{margin:10}} to="/">SignUp</Link>
                        </div>
                </div>
                )}
                </div>
                
            )}
        </div>
    )
}