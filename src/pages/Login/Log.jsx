import React,{useEffect, useState} from 'react'
import axios from 'axios'
import medicine from './medicine.png'
import medicine2 from './medicine2.png'
import './Log.css'
import { useNavigate } from 'react-router-dom'

const Log = () => {
    const[email,setEmail]=useState("");
    const[mdp,setMdp]=useState("");
    const[error,setError]=useState(false);
    const[error1,setError1]=useState(false);
    const navigate=useNavigate();

    const handleAdd=(e)=>{
        e.preventDefault();
        axios.get(`http://localhost:2604/get/login/${email}`)
        .then((result)=>{
            if(result.data.length>0){
                if(mdp===result.data[0].mdp){
                    navigate("/")
                }
                else{
                    setError(true)
                }
            }else{
                setError1(true)
            }
         
        })
       
    }
  return (
    <>
       <div className="main-contain login">
        <div className="card-login">
            <div className="left-login">

            </div>
            <div className="right-login">
                <h3>Se connecter</h3>
                {error1 &&  <p className='error1-login'>Vérifier les informations saisies</p>}
                    
                <form onSubmit={handleAdd}>
                    <div className="input">
                        <label >Email</label>
                        <input type="text" onChange={(e)=>{setEmail(e.target.value)}} required />
                    </div>
                   
                    {error &&  <p className='error-login'>Vérifier votre mot de passe</p>}
                    <div className="input">
                        <label >Mot de passe</label>
                        <input type="password" onChange={(e)=>{setMdp(e.target.value)}} required  />
                    </div>
                    <div className="input-button">
                        <button type='submit' className="btn-login">Envoyer</button>
                    
                    </div>
                    <div className="link">
                        <a href="/signup" className='create-count'>Créer un compte</a> 
                    </div>
                     
                </form>             
           
            </div>
           
            </div>
       </div>
    </>
  )
}

export default Log
