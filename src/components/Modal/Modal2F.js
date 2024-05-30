import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import successIcon from '../../icone/check.svg'

function Modal2F(props) {
   
    const [nom,setNom]=useState(props.nom);
    const [adresse,setAdresse]=useState(props.adresse);
    const [email,setEmail]=useState(props.email);
   
        const handleUpdate=()=>{
         
            axios.put(`http://localhost:2604/put/modifyFour/${props.userId}`,
            {nom:nom,adresse:adresse,email:email})
            .then(()=>{
              Swal.fire({
                title: "Félicitation!",
                text: "Modification réussi!",
                icon:'success',
                iconHtml: `<img src="${successIcon}" style="width: 50px; height: 50px;">`, // Utilisez votre icône SVG personnalisée
                showConfirmButton: false, // Ne pas afficher de bouton de confirmation pour fermer automatiquement le SweetAlert
                timer: 2000 
              });
            })
         
        }
  
  return (
    <>
   <div className='overlay' >
            <div className='modal-content'> 
              <form onSubmit={handleUpdate}>
                <h3>Modification d'un fournisseur</h3>
                 
               <div className='div-form'>
                  <label>Nom </label>
                  <input required type='text' value={nom} onChange={(e)=>{setNom(e.target.value)}}/>
                </div> 

                <div className='div-form'>
                  <label>Adresse</label>
                  <input required type='text' value={adresse} onChange={(e)=>{setAdresse(e.target.value)}} />
                </div> 

                <div className='div-form'>
                  <label>Email</label>
                  <input required type='emai' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                </div> 
                
                <div className='btn-form div-form'>
                    <button className='btn-modal' type='submit'>Modifier</button>
                    <button className='btn-modal'onClick={props.handleexit2}>Annuler</button> 
                </div> 

               </form>
             
            </div>
         </div>
    </>
  )
}

export default Modal2F