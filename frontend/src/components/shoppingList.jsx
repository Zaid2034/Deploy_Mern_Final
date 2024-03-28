/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { getLoggedInUsername } from './loggedIn';
import { getToken } from './storingToken';
import { Link } from 'react-router-dom';
import '../App.css';
export function ShoppingItem(){
     const [items,setItems]=useState([]);
     const [loading1,setLoading1]=useState(false)
     const token=getToken()
     console.log(`token is: ${token}`)
     const loggedInUsername=getLoggedInUsername()
     console.log(`username is : ${loggedInUsername}`);
     if(token==null && loggedInUsername==null){
        return <div>
            <Link to="/login">
                <p>Incorrect username or email</p>
                <button>Login Again</button>
            </Link>
        </div>
     }
     const gettingAllItems=async ()=>{
        setLoading1(true)
        console.log(`loading is:${loading1}`)
        try{
            await fetch('https://deploy-mern-backend1-1.onrender.com/shopping_items',{
                method:'GET',
                headers:{
                    "Authorization":`Bearer ${token}`,
                    "Content-type":"application/json"
                }
                }).then(async(res)=>{
                    const json=await res.json();
                    console.log(json.itemsArr);
                    setItems(json.itemsArr);
                })
        }catch(error){
            console.error("Error in getting Items",error);
        }finally{
            setLoading1(false)
        }
        console.log(`loading is:${loading1}`)
     }
     return (
        <div>
        {loading1? (<div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>Getting items from server....</p>
                </div>):(
            <div>
        <h1>{loggedInUsername}</h1>
        <button 
        onClick={
            gettingAllItems
        }
        >Get Item</button>
        {items.map((item,index)=>{
            return (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div
                style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    marginRight: '10px',
                    border:'1px solid black',
                    background: item.mark ? 'black' : 'white', // Conditionally set background color
                }}
                onClick={async()=>{
                    const updatedItems = [...items];
                    updatedItems[index].mark = !updatedItems[index].mark;
                    setItems(updatedItems); 
                    await fetch('https://deploy-mern-backend1-1.onrender.com/shopping_items_update',{
                            method:'POST',
                            body:JSON.stringify({
                                id:item.id,
                            }),
                            headers:{
                                "Authorization":`Bearer ${token}`,
                                "Content-type":"application/json"
                            }
                        })
                    
                }}
            ></div>
            <p>{item.name}</p>
        </div>
        );
        })}

    </div>

        )
        }
        

        </div>
     )
     
}