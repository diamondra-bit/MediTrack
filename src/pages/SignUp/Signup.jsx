import React, { useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import axios from 'axios'

const Signup = () => {
    const[email,setEmail]=useState("");
    const[mdp,setMdp]=useState("");
    
    const navigate=useNavigate();
    const [error,setError]=useState(false);

    
    useEffect(()=>{
        axios.get("http://localhost:2604/get/utilisateur")
        .then((result)=>{
            for (let i=0;i<result.data.length;i++)
            {   
                console.log(result.data[i].email)
                console.log(email)
                if(result.data[i].email===email)
                {
                    setError(true)
                    console.log("If")
                    console.log(error)
                }
            }
        })
    },[error,email])

    const handleAdd=(e)=>{
        axios.post("http://localhost:2604/post/createCount",{
            email:email,mdp:mdp
        })
        .then(
            navigate("/login")
        )
    }
  return (
    <>
       <div className="main-contain login">
        <div className="card-login">
            <div className="left-login">

            </div>
            <div className="right-login">
                <h3>Créer un compte</h3>
                <form onSubmit={handleAdd}>
                {error&& <p className='error-login'>Ce compte email existe déja</p>}
              
                    <div className="input">
                        <label >Email</label>
                        <input type="text" onChange={(e)=>{
                            setError(false)
                            setEmail(e.target.value)}} required />
                    </div>
                    <div className="input">
                        <label >Mot de passe</label>
                        <input type="password" onChange={(e)=>{setMdp(e.target.value)}} required/>
                    </div>
                    <div className="input-button">
                    {!error &&  <button type='submit' className="btn-login">Envoyer</button>} 
                    
                    
                    </div>
                    <div className="link">
                      <a href="/login" className='create-count'>Se connecter</a>
                    </div>
                </form>             
           
            </div>
           
            </div>
       </div>
    </>
  )
}

export default Signup
